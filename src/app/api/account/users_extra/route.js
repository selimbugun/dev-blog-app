// pages/api/account/users_extra/route.ts

import { cookies } from "next/headers";
import { createClientWithToken } from "@/lib/supabaseWithToken";

export async function GET() {
  const token = cookies().get("sb-access-token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const supabase = createClientWithToken(token);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: userError?.message || "Unauthorized" }),
      {
        status: 401,
      }
    );
  }

  const { data, error } = await supabase
    .from("users_extra")
    .select("*")
    .eq("id", user.id)
    .single(); // Tek kayıt bekliyorsan

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return Response.json(data);
}
