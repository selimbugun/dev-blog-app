import { createClient } from "@/lib/supabaseClient";
import getUserServer from "@/utils/getUserServer";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient;
  const user = await getUserServer();
  console.log(user.user.user.id);
  const userId = user.user.user.id;

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", userId);
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return NextResponse.json(data, {
    status: 200,
  });
}
