import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import LandingPage from "../comps/home/LandingPage";
import MainPage from "../comps/home/MainPage";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(_event, session);
    });
  }, [session]);

  return (
    <main>{session ? <MainPage session={session} /> : <LandingPage />}</main>
  );
}
