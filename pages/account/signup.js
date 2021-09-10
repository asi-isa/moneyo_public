import { useEffect, useState } from "react";
import styles from "../../styles/Signup.module.css";
import Alert from "../../comps/alert/Alert";
import Loader from "../../comps/loader/Loader";
import { supabase } from "../../db/supabase";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import {
  AiOutlineGoogle,
  AiFillApple,
  AiOutlineGithub,
  AiFillFacebook,
} from "react-icons/ai";

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [signupSuccess, setSignupSuccess] = useState(false);

  async function signupHandler(e) {
    e.preventDefault();

    let [name, email, password] = [...e.currentTarget.elements];
    [name, email, password] = [name.value, email.value, password.value];

    try {
      setLoading(true);

      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error !== 406) {
        throw error;
      }

      if (user) {
        try {
          const { data, error } = await supabase
            .from("finance_user")
            .insert([{ id: user.id, name }]);

          if (error) {
            throw error;
          }
        } catch (error) {
          alert(error.message);
        }
      }

      setSignupSuccess(true);
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

  return (
    <section className={styles.signinup}>
      {signupSuccess && (
        <Alert
          counterBeginsAt={20}
          text="in the next moments you will be receiving an email. please follow the link in that email to verify your account and to log in."
          footertext="thank you for joining us :)"
        />
      )}
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.goback}>
            <IoIosArrowBack />
          </a>
        </Link>
        <h1 className={styles.title}>sign up</h1>
      </div>

      <div className={styles.auth_section}>
        <p className={styles.faded}>
          sign up with one of the following options
        </p>
        <div className={styles.oauths}>
          <button className={styles.oauth}>
            <AiOutlineGoogle />
          </button>
          <button className={styles.oauth}>
            <AiFillApple />
          </button>
        </div>
        <div className={styles.oauths}>
          <button className={styles.oauth} onClick={gitHubAuth}>
            <AiOutlineGithub />
          </button>
          <button className={styles.oauth}>
            <AiFillFacebook />
          </button>
        </div>
      </div>

      <form className={styles.form} onSubmit={signupHandler}>
        <p className={styles.faded}>or sign up with your email</p>
        <label htmlFor="name">name</label>
        <input type="text" id="name" required placeholder="hi :)" />
        <label htmlFor="email">email</label>
        <input type="email" id="email" required placeholder="email@email.com" />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          required
          placeholder="pick a strong password"
        />
        <button className={styles.btn}>sign up</button>
      </form>

      <p className={styles.faded}>
        already have an account?{" "}
        <Link href="/account/signin">
          <a className={styles.signup_link}>sign in</a>
        </Link>
      </p>
      {loading && <Loader />}
    </section>
  );
}
