import { createClient } from "@/lib/supabaseClient";

export default function useRegister() {
  const supabase = createClient;
  const register = async (formData) => {
    // email kullanılıyor mu kontrol
    try {
      const { data: user, error: userError } = await supabase.rpc(
        "is_email_registered",
        {
          email_text: formData.email,
        }
      );

      if (user) {
        //email varsa bitir
        return { error: "Bu e-posta adresi zaten kullanılıyor.", state: false };
      }

      //kayıt
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login?confirmed=true`,
        },
      });
      console.log(data);

      if (signUpError) {
        return { error: signUpError.message, state: false };
      } else {
        return { error: "", state: true };
      }
    } catch (error) {
      return { error: error.message, state: false };
    }
  };

  return { register };
}
