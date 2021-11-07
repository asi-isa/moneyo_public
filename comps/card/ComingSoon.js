import styles from "./ComingSoon.module.css";

import Image from "next/image";

import Button from "../btn/Button";
import pattern from "../../public/images/pattern.jpg";

export default function ComingSoon({ closeSelf }) {
  function submitHandler(e) {
    console.log(e);
    console.log(e.current);
    console.log(e.currentValue);
  }

  return (
    <>
      <div className={styles.modal} onClick={closeSelf}></div>
      <article className={styles.coming_soon}>
        <div className={styles.info}>
          <h1 className={styles.title}>get notified when we launch our apps</h1>

          <form className={styles.form} onSubmit={submitHandler}>
            <input
              type="text"
              className={styles.input}
              placeholder="your email"
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
    </>
  );
}
