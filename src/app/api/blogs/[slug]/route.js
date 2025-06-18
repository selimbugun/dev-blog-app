import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { slug } = await params;

  const supabase = await createClient;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      description,
      content,
      cover_image,
      created_at,
      users_extra (
        username,
        avatar_url

      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

// ...existing code...

export async function DELETE(_, { params }) {
  const { slug } = await params;

  const supabase = createClient;

  const { error } = await supabase.from("posts").delete().eq("slug", slug);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(
    JSON.stringify({ message: "Blog deleted successfully." }),
    {
      status: 200,
    }
  );
}
