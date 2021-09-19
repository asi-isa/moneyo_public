import styles from "../../styles/Logout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../db/supabase";
import AlertTimer from "../../comps/alert/AlertTimer";
import Loader from "../../comps/loader/Loader";
import { IoIosArrowBack } from "react-icons/io";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  const [signoutSuccess, setSignoutSuccess] = useState(false); // starter/stopper für counter

  useEffect(() => {
    setSession(supabase.auth.session());
    if (session) signout();
  }, [session]);

  async function signout() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSignoutSuccess(true);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <section className={styles.logout}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.goback}>
            <IoIosArrowBack />
          </a>
        </Link>
        <h1 className={styles.title}>sign out</h1>
      </div>

      {signoutSuccess && (
        <AlertTimer
          counterBeginsAt={5}
          text=""
          footertext="have a nice day :)"
        />
      )}
      {loading && <Loader />}
    </section>
  );
}
