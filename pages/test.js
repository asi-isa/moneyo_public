import LPDesktop from "../comps/home/LPDesktop";
import LPMobile from "../comps/home/LPMobile";
import styles from "../styles/Test.module.css";

export default function Test() {
  return (
    <section className={styles.test}>
      {/* <LPMobile /> */}
      <LPDesktop />
    </section>
  );
}
