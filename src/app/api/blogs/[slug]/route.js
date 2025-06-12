import { createClient } from "@/lib/supabaseClient";

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
