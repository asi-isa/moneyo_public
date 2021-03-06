import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsPlusSquare, BsCalendar, BsPeopleCircle } from "react-icons/bs";
import Calendar from "../calendar/Calendar";
import getCurrentBalance from "../../utils/getCurrentBalance";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../db/supabase";
import AlterFinanceForm from "../finance/AlterFinanceForm";
import getToday from "../../utils/getToday";
import Card from "../finance/Card";
import getDatesFromObjArr from "../../utils/getDatesFromObjArr";
import Loader from "../loader/Loader";
import CurrentBalanceCard from "../finance/CurrentBalanceCard";
import thousandPoint from "../../utils/thousandPoint";
import getBalancesForAllDates from "../../utils/getBalancesForAllDates";
import InitBalanceForm from "../finance/InitBalanceForm";
import ExpenseOrIncome from "../finance/ExpenseOrIncome";
import getFinanceAndMonthCards from "../../utils/getFinanceAndMonthCards";
import getDateAtZero from "../../utils/getDateAtZero";

export default function MainPage({ session }) {
  const today = getToday();
  const currentMonth = new Date().getMonth();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [finances, setFinances] = useState(null);
  const [financeDates, setFinanceDate] = useState(null);
  const [financesToShow, setFinancesToShow] = useState(null);
  const [balance, setBalance] = useState(null);
  const [initBalance, setInitBalance] = useState(null);
  const [showInitBalanceForm, setShowInitBalanceForm] = useState(false);
  const [allBalances, setAllBalances] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showExpenseOrIncome, setShowExpenseOrIncome] = useState(false);
  const [showNewFinanceForm, setShowFinanceForm] = useState(false);
  const [showAlterFinanceForm, setAlterFinanceForm] = useState(false);
  const [currentFinanceToAlter, setCurrentFinanceToAlter] = useState(null);
  const [mountUnmountAnimation, setMountUnmountAnimation] = useState(true);
  const [month, setMonth] = useState(null); // Hilfsvar. f??r das anzeigen von Monatscards

  function getSelectedDate(year, month, day) {
    const newDate = new Date(year, month, day);

    setFinancesToShow(
      finances.filter((finance) => getDateAtZero(finance.date) >= newDate)
    );

    setDate(newDate);
  }

  function toggleCalendar() {
    setShowCalendar(!showCalendar);
    toggleMountUnmountAnimation();
  }
  function toggleNewFinanceForm() {
    setShowFinanceForm(!showNewFinanceForm);
  }
  function showAlterFinanceFormHandler(currentFinance) {
    setCurrentFinanceToAlter(currentFinance);
    setAlterFinanceForm(true);
  }
  function toggleExpenseOrIncome() {
    console.log("fire");
    setShowExpenseOrIncome(!showExpenseOrIncome);
  }

  function closeAlterFinanceFormHandler() {
    setAlterFinanceForm(false);
  }

  function toggleMountUnmountAnimation() {
    setMountUnmountAnimation(false);
    setTimeout(() => {
      setMountUnmountAnimation(true);
    }, 100);
  }

  function toggleInitBalanceForm() {
    setShowInitBalanceForm(!showInitBalanceForm);
  }

  useEffect(() => {
    if (session) getFinances();

    if (session && initBalance === null) getInitBalance();
    // es wurden noch keine Anfangsbest??nde gesetzt
    if (initBalance === 0) toggleInitBalanceForm();
  }, [session, initBalance]);

  function getFinancesAtMonth(month) {
    const financesAtMonth = finances.filter(
      (finance) => new Date(finance.date).getMonth() >= month
    );
    return financesAtMonth;
  }

  async function getInitBalance() {
    console.log("getInitBalance");
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("finance_user")
        .select("init_balance")
        .eq("id", session.user.id);

      if (error && status !== 406) throw error;

      if (data) {
        setInitBalance(data[0]["init_balance"]);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getFinances() {
    console.log("getfinances");
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("finance")
        .select("*")
        .eq("user_id", session.user.id)
        // .lte("date", jsDateToHtmlDate(add(today, { years: 3 })))
        .order("date", { ascending: true });
      // .limit(100);

      if (error && status !== 406) throw error;

      if (data) {
        setFinances(data);

        setAllBalances(getBalancesForAllDates(data));

        setBalance(initBalance + getCurrentBalance(data));

        // damit aeltere Finanzen nicht als Card angezeigt werden
        // setFinancesAtMonth(
        //   data.filter((finance) => new Date(finance.date) >= currentMonth)
        // );

        // nur heutige oder zuk??nftige finanzen zeigen
        setFinancesToShow(
          data.filter((finance) => getDateAtZero(finance.date) >= today)
        );

        // markiere paydays in Kalendar
        setFinanceDate(getDatesFromObjArr(data));
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // TODO: evtl. l??schen
  // framer motion
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      staggerChildren: 0.5,
    },
  };

  const variant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5 } },
    hidden2: { opacity: 0, scale: 0 },
    visible2: { opacity: 1, scale: 1, transition: { delay: 0.5 } },
  };
  const noVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className={styles.mainpage}>
      <header className={styles.header}>
        <Link href="/account/user">
          <a>
            <BsPeopleCircle className={styles.pointer} />
          </a>
        </Link>

        <BsCalendar onClick={toggleCalendar} className={styles.pointer} />

        <BsPlusSquare
          onClick={toggleExpenseOrIncome}
          className={styles.pointer}
        />
        {/* <BsPlusSquare
          onClick={toggleNewFinanceForm}
          className={styles.pointer}
        /> */}
      </header>

      <AnimatePresence>
        {showCalendar && financeDates && (
          <motion.div
            className={styles.center_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Calendar getSelectedDate={getSelectedDate} dates={financeDates} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExpenseOrIncome && (
          <motion.div
            className={styles.center_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ExpenseOrIncome
              closeHandler={toggleExpenseOrIncome}
              selectedDate={date}
              getFinances={getFinances}
              session={session}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence>
        {showNewFinanceForm && (
          <motion.div
            className={styles.center_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NewFinanceForm
              closeFormHandler={toggleNewFinanceForm}
              selectedDate={date}
              getFinances={getFinances}
              session={session}
            />
          </motion.div>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
        {showAlterFinanceForm && (
          <motion.div
            className={styles.center_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlterFinanceForm
              currentFinanceToAlter={currentFinanceToAlter}
              closeAlterFinanceFormHandler={closeAlterFinanceFormHandler}
              getFinances={getFinances}
              session={session}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mountUnmountAnimation && (
          <motion.section
            className={styles.cards}
            variants={variant}
            initial={"hidden"}
            animate={"visible"}
            exit={{ opacity: 0 }}
          >
            <CurrentBalanceCard
              currentBalance={thousandPoint(balance)}
              date={today}
            />

            {allBalances &&
              financesToShow &&
              getFinanceAndMonthCards(
                financesToShow,
                initBalance,
                allBalances,
                showAlterFinanceForm,
                showAlterFinanceFormHandler
              )}
          </motion.section>
        )}
      </AnimatePresence>

      {loading && <Loader />}
      {showInitBalanceForm && (
        <InitBalanceForm
          session={session}
          closeFormHandler={toggleInitBalanceForm}
          getInitBalance={getInitBalance}
        />
      )}
    </section>
  );
}
