import Progressbar from "../progressbar/Progressbar";
import styles from "./LearnMore.module.css";

export default function LearnMore() {
  return (
    <>
      <Progressbar bars={3} progress={0} />
      <section className={styles.learnmore}>
        <h1>learn more</h1>
        <p>coming soon ;)</p>
      </section>
    </>
  );
}
