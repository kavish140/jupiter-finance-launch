import json
import re
from datetime import datetime, timezone
from pathlib import Path

OUTPUT_PATH = Path("src/data/videos.json")
MAX_STORED_VIDEOS = 12


def extract_video_id(url: str) -> str:
    patterns = [
        r"youtu\.be/([A-Za-z0-9_-]{11})",
        r"youtube\.com/watch\?v=([A-Za-z0-9_-]{11})",
        r"youtube\.com/shorts/([A-Za-z0-9_-]{11})",
        r"youtube\.com/embed/([A-Za-z0-9_-]{11})",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    raise RuntimeError("Unable to extract a valid YouTube video ID from the URL.")


def load_videos() -> list[dict]:
    if not OUTPUT_PATH.exists():
        return []

    content = OUTPUT_PATH.read_text(encoding="utf-8").strip()
    if not content:
        return []

    parsed = json.loads(content)
    if not isinstance(parsed, list):
        return []

    return parsed


def save_videos(videos: list[dict]) -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(videos[:MAX_STORED_VIDEOS], indent=2, ensure_ascii=False), encoding="utf-8")


def upsert_video(videos: list[dict], video_id: str, title: str, source_url: str) -> list[dict]:
    normalized = [v for v in videos if v.get("videoId") != video_id]
    normalized.insert(
        0,
        {
            "videoId": video_id,
            "title": title.strip() or "Manual Upload",
            "description": "",
            "publishedAt": datetime.now(timezone.utc).isoformat(),
            "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "sourceUrl": source_url,
            "source": "manual",
        },
    )
    return normalized


def main() -> None:
    manual_video_url = (Path("manual_video_url.txt").read_text(encoding="utf-8") if Path("manual_video_url.txt").exists() else "").strip()
    manual_video_title = (Path("manual_video_title.txt").read_text(encoding="utf-8") if Path("manual_video_title.txt").exists() else "").strip()

    if not manual_video_url:
        raise RuntimeError("manual_video_url is required")

    video_id = extract_video_id(manual_video_url)
    videos = load_videos()
    merged = upsert_video(videos, video_id, manual_video_title or "Latest Jupiter Finance Video", manual_video_url)
    save_videos(merged)

    print(f"Added or updated manual video: {video_id}")


if __name__ == "__main__":
    main()
