import getUserServer from "@/components/getUserServer";
import { redirect } from "next/navigation";
import LoginForm from "@/components/loginForm";

export default async function Page() {
  const user = await getUserServer();

  if (user) {
    redirect("/");
  }

  return <LoginForm />;
}
