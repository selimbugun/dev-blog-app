export default function useLogin() {
  const login = async (data) => {
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) {
        if (result.error === "Invalid login credentials")
          return "Kullanıcı adı veya sifre yanlış";

        return result.error;
      }

      window.location.href = "/";
    } catch (error) {
      return error.message;
    }
  };

  return { login };
}
