import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "src", "posts", "posts.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const posts = JSON.parse(jsonData);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "src", "posts", "posts.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const posts = JSON.parse(jsonData);

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <small>{post.date}</small>
    </div>
  );
}
