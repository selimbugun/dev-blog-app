import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return Response.json(data, {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  const user = {
    username,
    password_hash: password,
  };
  const { data, error } = await supabase.from("users").insert([user]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return Response.json(data, {
    status: 200,
  });
}
