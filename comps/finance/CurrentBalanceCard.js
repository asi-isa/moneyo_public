import getToday from "../../utils/getToday";
import getTodayAsString from "../../utils/getTodayAsString";
import getMonthName from "../../utils/getMonthName";
import styles from "./CurrentBalanceCard.module.css";

export default function CurrentBalanceCard(props) {
  const today = props.date;
  return (
    <article className={styles.cb_card}>
      <p className={styles.header}>{`${today.getDate()}. ${getMonthName(
        today.getMonth()
      )} ${today.getFullYear()}`}</p>
      <p className={styles.text}>
        ${props.currentBalance >= 0 ? "" : "-"} {props.currentBalance}
      </p>
    </article>
  );
}
