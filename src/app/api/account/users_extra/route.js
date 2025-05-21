// pages/api/account/users_extra/route.ts

import { cookies } from "next/headers";
import { createClientWithToken } from "@/lib/supabaseWithToken";

export async function GET() {
  const cookie = await cookies();

  const token = await cookie.get("sb-access-token")?.value;

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
    .eq("user_id", user.id)
    .single(); // Tek kayıt bekliyorsan

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return Response.json(data);
}

export async function PUT(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authorization token required" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const supabase = createClientWithToken(token);

    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: authError?.message || "Unauthorized" }),
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("body", body);

    const { id, ...updateData } = body;

    const { data: existingRecord, error: fetchError } = await supabase
      .from("users_extra")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    if (existingRecord.user_id !== userData.user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized to update this record" }),
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("users_extra")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    //
  } catch (error) {
    console.error("PUT error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
