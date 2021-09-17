import Progressbar from "../progressbar/Progressbar";
import Link from "next/link";
import styles from "./LearnMore.module.css";

export default function LearnMore() {
  return (
    <>
      <Progressbar bars={3} progress={0} />
      <section className={styles.learnmore}>
        <h1 className={styles.title}>Introduction</h1>
        <h5 className={styles.description_header}>
          moneyo is a open source financial planner.
        </h5>
        <p className={styles.description}>
          it allows us to quickly overview our finances. and with that you get
          answers to questions like:
        </p>

        <p className={styles.description}>- when the next bill is due?</p>
        <p className={styles.description}>
          - how much money I will have in 3 months?
        </p>
        <p className={styles.description}>
          - should I buy this in one pay, with instalments, or not at all?
        </p>
        <p className={styles.description}>- how long will my savings last?</p>
        <p className={styles.description}>
          - and associated with that, by when I have to go to work again? ;)
        </p>

        <p className={styles.description}>
          without further ado, lets create an account.
        </p>

        <Link href="/">
          <a className={styles.btn}>next</a>
        </Link>
      </section>
    </>
  );
}
