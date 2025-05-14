"use client";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.user);

  console.log(user);

  return (
    <div>
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}
