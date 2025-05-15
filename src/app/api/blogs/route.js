import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return Response.json(data, {
    status: 200,
  });
}
