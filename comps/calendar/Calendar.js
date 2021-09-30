import { useEffect, useState } from "react";
import getMonthName from "../../utils/getMonthName";
import getMonthDays from "../../utils/getMonthDays";
import styles from "./Calendar.module.css";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { motion } from "framer-motion";
import getToday from "../../utils/getToday";

export default function Calendar({ getSelectedDate, dates }) {
  const today = new Date();
  const todayAtZero = getToday();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthName = getMonthName(month);
  const monthWeeks = makeCalendarWeeks();

  // info for parent
  useEffect(() => {
    console.log("use");
    // user switched month => set date to first of that new month
    if (selectedDay === -1) {
      getSelectedDate(year, month, 1);
    } else {
      getSelectedDate(year, month, selectedDay);
    }
  }, [selectedDay, month, year]);

  function makeCalendarWeeks() {
    const monthDays = [];
    const monthWeeks = [];

    // wenn der monat nicht beim montag beginnt
    const offset = new Date(year, month, 0).getDay();
    for (let weekdayOffset = 0; weekdayOffset < offset; weekdayOffset++) {
      monthDays.push(
        <td
          key={`${weekdayOffset}-weekdayOffset`}
          className={`${styles.table_data} ${styles.offset_day}`}
        ></td>
      );
    }

    for (let day = 0; day < getMonthDays(year, month); day++) {
      const currentDate = new Date(year, month, day + 1);
      const flag = dates.includes(currentDate.getTime());

      monthDays.push(
        <td
          key={day}
          className={`${styles.table_data} ${
            selectedDay === day + 1 && styles.selected_day
          } ${flag && styles.payday} ${
            currentDate.getTime() === todayAtZero.getTime() && styles.to_day
          }`}
          onClick={selectDay}
        >
          {" "}
          {day + 1}
        </td>
      );
    }

    const dayOrOffsetLength = monthDays.length + offset;
    let monthWeek = [];
    for (let dayOrOffset = 0; dayOrOffset < dayOrOffsetLength; dayOrOffset++) {
      monthWeek.push(monthDays[dayOrOffset]);

      if (monthWeek.length === 7 || dayOrOffset === dayOrOffsetLength - 1) {
        monthWeeks.push(
          <tr key={dayOrOffset} className={styles.table_row}>
            {monthWeek}
          </tr>
        );

        monthWeek = [];
      }
    }

    return monthWeeks;
  }

  function selectDay(e) {
    setSelectedDay(+e.target.innerText);
  }

  function nextMonth() {
    // next year
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    // no selected Day when changing month
    setSelectedDay(-1);
  }

  function prevMonth() {
    // previous year
    if (month - 1 === -1) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    // no selected Day when changing month
    setSelectedDay(-1);
  }

  // framer-motion

  return (
    <article
      className={styles.calendar}
      // initial={{ opacity: 0 }}
      // animate={{
      //   opacity: [1, 0, 1, 0, 1],
      //   scale: [1, 1.5, 2, 1.5, 1],
      //   borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      // }}
      // transition={{ duration: 5 }}
    >
      <div className={styles.header}>
        <button className={styles.next_prev_btn} onClick={prevMonth}>
          <BsArrowLeftShort />
        </button>
        <div className={styles.month_year}>
          <span className={styles.month}>{monthName}</span>
          <span className={styles.year}>{year}</span>
        </div>

        <button className={styles.next_prev_btn} onClick={nextMonth}>
          <BsArrowRightShort />
        </button>
      </div>

      <table className={styles.weekdays}>
        <thead>
          <tr className={styles.table_row}>
            <th className={styles.table_head_data}>Mo</th>
            <th className={styles.table_head_data}>Tu</th>
            <th className={styles.table_head_data}>We</th>
            <th className={styles.table_head_data}>Th</th>
            <th className={styles.table_head_data}>Fr</th>
            <th className={styles.table_head_data}>Sa</th>
            <th className={styles.table_head_data}>Su</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>{monthWeeks}</tbody>
      </table>
    </article>
  );
}
