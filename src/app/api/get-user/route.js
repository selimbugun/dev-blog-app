import { cookies } from "next/headers";
import createSupabaseWithToken from "@/lib/supabaseWithToken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  const supabase = createSupabaseWithToken(token);
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    return Response.json({ user: null }, { status: 401 });
  }

  return Response.json({ user });
}
