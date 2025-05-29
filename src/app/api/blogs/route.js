import { createClient } from "@/lib/supabaseClient";
import { createClientWithToken } from "@/lib/supabaseWithToken";
import { slugify } from "@/utils/slugify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient;
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return NextResponse.json(data, {
    status: 200,
  });
}

export async function POST(req) {
  const body = await req.json();
  console.log(body.author_id);
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  const slug = slugify(body.title);

  const supabase = await createClientWithToken(token);
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: body.title,
      slug: slug,
      content: body.content,
      description: body.description,
      created_at: new Date().toISOString(),
      published: true,
      cover_image: body.cover_image,
      author_id: body.author_id,
    })
    .select();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  if (!data || data.length === 0) {
    return new NextResponse(JSON.stringify({ error: "No data returned" }), {
      status: 500,
    });
  }

  return new NextResponse(
    JSON.stringify({
      message: "Post başarıyla oluşturuldu.",
      post: data[0],
    }),
    { status: 201 } // 201 Created
  );
}
