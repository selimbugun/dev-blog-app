import { cookies } from "next/headers";
import { createClientWithToken } from "@/lib/supabaseWithToken";
import { NextResponse } from "next/server";
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
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const cookie = await cookies();

  const supabase = await createClientWithToken(
    cookie.get("sb-access-token")?.value
  );

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("slug", slug);

  if (deleteError) {
    console.error("Delete error:", deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
