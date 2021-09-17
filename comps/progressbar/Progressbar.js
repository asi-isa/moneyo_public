import styles from "./Progressbar.module.css";

export default function Progressbar(props) {
  const bars = [];
  for (let barNr = 0; barNr < props.bars; barNr++) {
    bars.push(
      <article
        className={`${styles.bar}  ${
          props.progress >= barNr + 1 && styles.fill
        }`}
      ></article>
    );
  }
  return <section className={styles.progressbar}>{bars}</section>;
}
