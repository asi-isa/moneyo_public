import LPDesktop from "../comps/home/LPDesktop";
import LPMobile from "../comps/home/LPMobile";
import styles from "../styles/Test.module.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Test() {
  const { width, height } = useWindowDimensions();
  console.log(width, height);

  return (
    <section className={styles.test}>
      {width > 733 ? <LPDesktop /> : <LPMobile />}
    </section>
  );
}
