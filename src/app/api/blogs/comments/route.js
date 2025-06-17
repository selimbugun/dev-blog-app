import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createClient;
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        *,
        user: users_extra(username)
        `
    )
    .eq("post_id", postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
