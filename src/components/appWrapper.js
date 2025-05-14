"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initUser } from "@/app/store/initUser";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Container } from "@mui/material";

export default function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>{children}</Container>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
