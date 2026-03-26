import json
from pathlib import Path

OUTPUT_PATH = Path("src/data/posts.json")
REMOVE_ID_PATH = Path("remove_post_id.txt")


def main() -> None:
    remove_post_id = REMOVE_ID_PATH.read_text(encoding="utf-8").strip() if REMOVE_ID_PATH.exists() else ""
    if not remove_post_id:
        raise RuntimeError("remove_post_id is required")

    posts = []
    if OUTPUT_PATH.exists():
        parsed = json.loads(OUTPUT_PATH.read_text(encoding="utf-8") or "[]")
        if isinstance(parsed, list):
            posts = parsed

    filtered = [post for post in posts if post.get("id") != remove_post_id]
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(filtered, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Removed post if present: {remove_post_id}")


if __name__ == "__main__":
    main()
