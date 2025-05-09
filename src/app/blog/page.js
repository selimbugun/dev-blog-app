import path from "path";
import fs from "fs";
import Link from "next/link";

export default function Page() {
  const filePath = path.join(process.cwd(), "src", "posts", "posts.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const posts = JSON.parse(jsonData);
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
