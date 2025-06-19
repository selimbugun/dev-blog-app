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

async function generateUniqueSlug(title, supabase) {
  const baseSlug = slugify(title);

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116: no rows found, yani slug boşsa sorun yok
      throw new Error(error.message);
    }

    if (!data) break; // slug kullanılmıyor, kır döngüyü

    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
}

export async function POST(req) {
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  const supabase = await createClientWithToken(token);
  const slug = await generateUniqueSlug(body.title, supabase);

  //
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
    .select(
      "id, title, slug, content, description, created_at, published, cover_image, author_id"
    );

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
