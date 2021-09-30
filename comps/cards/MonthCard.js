import styles from "./MonthCard.module.css";

export default function MonthCard({ month }) {
  return <article className={styles.month_card}>{month}</article>;
}
