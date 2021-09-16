import styles from "./CreateAccount.module.css";

export default function CreateAccount() {
  return (
    <section className={styles.create_accout}>
      <article className={styles.progressbar}>
        <div className={styles.bar_one}></div>
        <div className={styles.bar_two}></div>
        <div className={styles.bar_three}></div>
      </article>

      <article className={styles.header}>
        <h1 className={styles.title}>create account</h1>
      </article>
    </section>
  );
}
