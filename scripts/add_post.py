import json
import re
from datetime import datetime, timezone
from pathlib import Path

OUTPUT_PATH = Path("src/data/posts.json")
TITLE_PATH = Path("post_title.txt")
EXCERPT_PATH = Path("post_excerpt.txt")
CONTENT_PATH = Path("post_content.txt")
CATEGORY_PATH = Path("post_category.txt")
MAX_POSTS = 20


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9\s-]", "", value).strip().lower()
    slug = re.sub(r"[\s-]+", "-", slug)
    return slug[:60] or "post"


def main() -> None:
    title = TITLE_PATH.read_text(encoding="utf-8").strip() if TITLE_PATH.exists() else ""
    excerpt = EXCERPT_PATH.read_text(encoding="utf-8").strip() if EXCERPT_PATH.exists() else ""
    content = CONTENT_PATH.read_text(encoding="utf-8").strip() if CONTENT_PATH.exists() else ""
    category = CATEGORY_PATH.read_text(encoding="utf-8").strip() if CATEGORY_PATH.exists() else "General"

    if not title:
        raise RuntimeError("post_title is required")

    posts = []
    if OUTPUT_PATH.exists():
        parsed = json.loads(OUTPUT_PATH.read_text(encoding="utf-8") or "[]")
        if isinstance(parsed, list):
            posts = parsed

    post_id = f"{slugify(title)}-{int(datetime.now(timezone.utc).timestamp())}"

    post = {
        "id": post_id,
        "title": title,
        "excerpt": excerpt,
        "content": content,
        "category": category or "General",
        "publishedAt": datetime.now(timezone.utc).isoformat(),
    }

    updated = [post] + posts
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(updated[:MAX_POSTS], indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Added post: {post_id}")


if __name__ == "__main__":
    main()
