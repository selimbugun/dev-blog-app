"use client";
import { useEffect, useState } from "react";

export default function GetUserClient() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/account/get-user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!user) return null;

  return user?.user;
}
