import styles from "./Alert.module.css";
import Link from "next/link";

export default function Alert({ title, text, link, btnText }) {
  return (
    <article className={styles.alert}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <Link href={link}>
        <a className={styles.btn}>{btnText}</a>
      </Link>
    </article>
  );
}
