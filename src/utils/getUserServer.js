import { cookies } from "next/headers";

export default async function getUserServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/account/get-user`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );
  const data = await response.json();

  if (!data.user) {
    return null;
  }

  return data;
}
