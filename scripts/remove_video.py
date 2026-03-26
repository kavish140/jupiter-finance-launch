import json
from pathlib import Path

OUTPUT_PATH = Path("src/data/videos.json")
REMOVE_ID_PATH = Path("remove_video_id.txt")


def main() -> None:
    remove_video_id = REMOVE_ID_PATH.read_text(encoding="utf-8").strip() if REMOVE_ID_PATH.exists() else ""
    if not remove_video_id:
        raise RuntimeError("remove_video_id is required")

    if not OUTPUT_PATH.exists():
        raise RuntimeError("videos.json does not exist")

    videos = json.loads(OUTPUT_PATH.read_text(encoding="utf-8") or "[]")
    if not isinstance(videos, list):
        raise RuntimeError("videos.json must contain a list")

    filtered = [video for video in videos if video.get("videoId") != remove_video_id]
    OUTPUT_PATH.write_text(json.dumps(filtered, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Removed video if present: {remove_video_id}")


if __name__ == "__main__":
    main()
