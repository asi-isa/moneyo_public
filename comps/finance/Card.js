import styles from "./Card.module.css";
import { supabase } from "../../db/supabase";
import { MdReplay } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import thousandPoint from "../../utils/thousandPoint";
import getCategoryIcon from "../../utils/getCategoryIcon";
import { useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Loader from "../loader/Loader";
import getMonthName from "../../utils/getMonthName";
import truncateString from "../../utils/truncateString";

export default function Card({
  name,
  amount,
  expectedBalance,
  date,
  currentDate,
  isRecurrent,
  category,
  isRevenue,
  id,
  showAlterFinanceFormHandler,
}) {
  const jsDate = new Date(date);
  const [loading, setLoading] = useState(false);

  async function clickHandler() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("finance")
        .select("*")
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        showAlterFinanceFormHandler(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      className={styles.card}
      // style={{
      //   borderBottomColor: isRevenue ? "var(--card-green)" : "var(--card-red)",
      // }}
      onClick={clickHandler}
    >
      <div className={styles.icon}>{getCategoryIcon(category)}</div>

      <div className={styles.faded_info}>
        <p className={styles.name}>{truncateString(name, 14)}</p>

        <div className={styles.numbers_header}>
          <h3 className={styles.amount}>{`${
            isRevenue ? "+ " : "- "
          }${thousandPoint(amount)} $`}</h3>
        </div>
      </div>

      <div className={styles.numbers}>
        <div className={styles.expected_balance}>
          <p>{`${jsDate.getDate()}. ${getMonthName(
            jsDate.getMonth()
          )} ${jsDate.getFullYear()}`}</p>
          <p>
            {jsDate < currentDate ? "account balance:" : "expected balance:"}
          </p>

          <div className={styles.balance_arrow}>
            <h3>
              {`${expectedBalance >= 0 ? "+" : "-"} ${thousandPoint(
                expectedBalance
              )} $`}
            </h3>

            {isRevenue ? (
              <div className={styles.arrow_container}>
                <BsArrowUpRight className={styles.arrow_updown} />
              </div>
            ) : (
              <div
                className={styles.arrow_container}
                style={{ backgroundColor: "#b100004d" }}
              >
                <BsArrowDownRight
                  className={styles.arrow_updown}
                  style={{ color: "#b10000" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </article>
  );
}
