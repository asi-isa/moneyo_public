import styles from "./ComingSoon.module.css";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../db/supabase";

import Loader from "../loader/Loader";
import Info from "../info/Info";
import pattern from "../../public/images/pattern.jpg";

export default function ComingSoon({ closeSelf }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const email = e.currentTarget.elements[0].value;

    try {
      const { data, error } = await supabase
        .from("coming_soon_emails")
        .insert([{ email }]);

      setSuccess(true);
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.modal} onClick={closeSelf}></div>
      <article className={styles.coming_soon}>
        <div className={styles.info}>
          <h1 className={styles.title}>get notified when we launch our apps</h1>

          <form className={styles.form} onSubmit={submitHandler}>
            <input
              type="email"
              className={styles.input}
              placeholder="your email"
              required
            />

            <button className={styles.btn}>notify me *</button>
          </form>

          <p className={styles.sidenote}>
            * don't worry. we wont spam you, promise :)
          </p>
        </div>

        <div className={styles.img_con}>
          <Image className={styles.img} src={pattern} quality={100} />
        </div>
      </article>
      {loading && <Loader />}
      {success && (
        <Info
          headerText="success :)"
          text="as soon as we launch our apps we will notify you"
          closeInfo={() => {
            setSuccess(false);
            closeSelf();
          }}
        />
      )}
    </>
  );
}
