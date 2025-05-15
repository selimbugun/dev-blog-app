import { createClient as _CreateClient } from "@supabase/supabase-js";

export const createClient = () =>
  _CreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
