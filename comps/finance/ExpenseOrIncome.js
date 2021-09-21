import styles from "./ExpenseOrIncome.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewFinanceForm from "./NewFinanceForm";

export default function ExpenseOrIncome({
  closeHandler,
  selectedDate,
  getFinances,
  session,
}) {
  const [closeSelf, setCloseSelf] = useState(false);
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);
  const [showNewIncomeForm, setShowNewIncomeForm] = useState(false);

  function toggleNewExpenseForm() {
    setShowNewExpenseForm(!showNewExpenseForm);
    setCloseSelf(true);
  }
  function toggleNewIncomeForm() {
    setShowNewIncomeForm(!showNewIncomeForm);
    setCloseSelf(true);
  }
  return (
    <>
      <div
        className={`${styles.modal} ${closeSelf && styles.display_none}`}
      ></div>
      <section
        className={`${styles.exp_or_inc} ${closeSelf && styles.display_none}`}
      >
        <div className={styles.header}>
          <h2>what would you like to add?</h2>
          <AiOutlineClose className={styles.close} onClick={closeHandler} />
        </div>
        <button
          className={`${styles.btn} ${styles.btn_exp}`}
          onClick={toggleNewExpenseForm}
        >
          expense
        </button>
        <button
          className={`${styles.btn} ${styles.btn_inc}`}
          onClick={toggleNewIncomeForm}
        >
          income
        </button>
      </section>

      <AnimatePresence>
        {(showNewExpenseForm || showNewIncomeForm) && (
          <motion.div
            className={styles.center_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NewFinanceForm
              closeFormHandler={
                showNewIncomeForm ? toggleNewIncomeForm : toggleNewExpenseForm
              }
              selectedDate={selectedDate}
              getFinances={getFinances}
              session={session}
              income={showNewIncomeForm ? true : false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
