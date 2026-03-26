import json
import os
from pathlib import Path

from googleapiclient.discovery import build

MAX_RESULTS = 4
DEFAULT_CHANNEL_HANDLE = "@JuptierFinance8654"
OUTPUT_PATH = Path("src/data/videos.json")


def resolve_channel_id(youtube, explicit_channel_id: str | None, channel_handle: str | None) -> str:
    if explicit_channel_id:
        return explicit_channel_id.strip()

    handle = (channel_handle or DEFAULT_CHANNEL_HANDLE).strip().lstrip("@")
    response = youtube.channels().list(part="id", forHandle=handle, maxResults=1).execute()
    items = response.get("items", [])
    if not items:
        raise RuntimeError(f"Unable to resolve channel ID for handle: @{handle}")

    return items[0]["id"]


def get_uploads_playlist_id(channel_id: str) -> str:
    if not channel_id.startswith("UC"):
        raise RuntimeError("Channel ID must start with 'UC' to derive uploads playlist ID.")
    return channel_id.replace("UC", "UU", 1)


def extract_thumbnail_url(thumbnails: dict) -> str:
    for key in ("maxres", "standard", "high", "medium", "default"):
        if key in thumbnails and "url" in thumbnails[key]:
            return thumbnails[key]["url"]
    return ""


def fetch_latest_videos(youtube, uploads_playlist_id: str) -> list[dict]:
    response = (
        youtube.playlistItems()
        .list(
            part="snippet,contentDetails",
            playlistId=uploads_playlist_id,
            maxResults=MAX_RESULTS,
        )
        .execute()
    )

    videos = []
    for item in response.get("items", []):
        snippet = item.get("snippet", {})
        video_id = item.get("contentDetails", {}).get("videoId")
        if not video_id:
            continue

        videos.append(
            {
                "videoId": video_id,
                "title": snippet.get("title", "Untitled"),
                "description": snippet.get("description", ""),
                "publishedAt": snippet.get("publishedAt", ""),
                "thumbnailUrl": extract_thumbnail_url(snippet.get("thumbnails", {})),
                "url": f"https://www.youtube.com/watch?v={video_id}",
            }
        )

    return videos


def main() -> None:
    api_key = os.environ.get("YOUTUBE_API_KEY")
    if not api_key:
        raise RuntimeError("Missing YOUTUBE_API_KEY environment variable.")

    youtube = build("youtube", "v3", developerKey=api_key)

    channel_id = resolve_channel_id(
        youtube,
        os.environ.get("YOUTUBE_CHANNEL_ID"),
        os.environ.get("YOUTUBE_CHANNEL_HANDLE"),
    )
    uploads_playlist_id = get_uploads_playlist_id(channel_id)

    latest_videos = fetch_latest_videos(youtube, uploads_playlist_id)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(latest_videos, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Saved {len(latest_videos)} videos to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
