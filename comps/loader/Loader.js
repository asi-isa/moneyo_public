import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <article className={styles.loader}>
      <img src="/loader.gif" alt="loading" />
    </article>
  );
}
