import { createClient } from "@/lib/supabaseClient";

export async function GET() {
  const supabase = await createClient();
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
