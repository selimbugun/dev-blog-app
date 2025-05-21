"use server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;
  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
  });
}
