import { createClient } from "@/lib/supabaseClient";

export const uploadImage = async (file) => {
  const supabase = createClient;
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}.${ext}`;
  const filePath = `editor/${filename}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  return data?.publicUrl ?? null;
};
