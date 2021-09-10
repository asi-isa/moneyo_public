import styles from "../../styles/Signin.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import {
  AiOutlineGoogle,
  AiFillApple,
  AiOutlineGithub,
  AiFillFacebook,
} from "react-icons/ai";
import { useState } from "react";
import { supabase } from "../../db/supabase";
import Loader from "../../comps/loader/Loader";
import Info from "../../comps/info/Info";

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  async function loginHandler(e) {
    e.preventDefault();

    const email = e.currentTarget.elements[0].value;
    const password = e.currentTarget.elements[1].value;

    try {
      setLoading(true);

      // if (email && password) {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function gitHubAuth() {
    try {
      setLoading(true);

      const { user, session, error } = await supabase.auth.signIn({
        provider: "github",
      });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  return (
    <section className={styles.signin}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.goback}>
            <IoIosArrowBack />
          </a>
        </Link>
        <h1 className={styles.title}>log In</h1>
      </div>

      <div className={styles.auth_section}>
        <p className={styles.faded}>log in with one of the following options</p>
        <div className={styles.oauths}>
          <button className={styles.oauth} onClick={toggleInfo}>
            <AiOutlineGoogle />
          </button>
          <button className={styles.oauth} onClick={toggleInfo}>
            <AiFillApple />
          </button>
        </div>
        <div className={styles.oauths}>
          <button className={styles.oauth} onClick={gitHubAuth}>
            <AiOutlineGithub />
          </button>
          <button className={styles.oauth} onClick={toggleInfo}>
            <AiFillFacebook />
          </button>
        </div>
      </div>

      <form className={styles.form} onSubmit={loginHandler}>
        <p className={styles.faded}>or log in with your email</p>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Enter your password"
        />
        <button className={styles.btn}>log in</button>
      </form>

      <p className={styles.faded}>
        dont have an account?{" "}
        <Link href="/account/signup">
          <a className={styles.signup_link}>sign up</a>
        </Link>
      </p>
      {loading && <Loader />}
      {showInfo && (
        <Info
          headerText="be patient :)"
          text="currently we only support GitHub as a authentication method"
          closeInfo={toggleInfo}
        />
      )}
    </section>
  );
}
