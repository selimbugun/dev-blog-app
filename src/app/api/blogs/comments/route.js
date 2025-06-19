import { createClient } from "@/lib/supabaseClient";
import { createClientWithToken } from "@/lib/supabaseWithToken";
import { cookies } from "next/headers";
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

export async function POST(request) {
  const cookie = await cookies();
  const supabase = createClientWithToken(cookie.get("sb-access-token")?.value);
  try {
    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content) {
      return NextResponse.json({ error: "Eksik veri" }, { status: 400 });
    }

    const created_at = new Date().toISOString();
    // Yorum ekle
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content, created_at }])
      .select(
        `
        *,
        user: users_extra(username)
        `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("id");
  const cookie = await cookies();

  const supabase = createClientWithToken(cookie.get("sb-access-token")?.value);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .match({ id: commentId, user_id: user.id }); // sadece kendi yorumunu silebilir

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
