import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import MainPage from "../comps/home/MainPage";
import LPMobile from "../comps/home/LPMobile";
import LPDesktop from "../comps/home/LPDesktop";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Home() {
  const [session, setSession] = useState(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // console.log(_event, session);
    });
  }, [session]);

  return (
    <section className={styles.main}>
      {session ? (
        <MainPage session={session} />
      ) : width > 733 ? (
        <LPDesktop />
      ) : (
        <LPMobile />
      )}
    </section>
  );
}
