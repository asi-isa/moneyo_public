import styles from "./NewFinanceForm.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRepeat, BsCalendar, BsCalendarFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { supabase } from "../../db/supabase";
import jsDateToHtmlDate from "../../utils/jsDateToHtmlDate";
import getCategoryIcon from "../../utils/getCategoryIcon";
import createUUID from "../../utils/createUUID";
import { useState } from "react";
import getAvgIntervalInMilliSeconds from "../../utils/getAvgIntervalInMilliSeconds";
import createRecurrentFinances from "../../utils/createRecurrentFinances";

export default function NewFinanceForm({
  closeFormHandler,
  getFinances,
  selectedDate,
  session,
}) {
  const dateAsString = jsDateToHtmlDate(selectedDate);
  const dateAsStringInThreeYears = jsDateToHtmlDate(
    new Date(
      selectedDate.getFullYear() + 3,
      selectedDate.getMonth(),
      selectedDate.getDate()
    )
  );

  const [currentCategory, setCurrentCategory] = useState(null);
  const [showRecurrentDialog, setShowRecurrentDialog] = useState(false);

  async function newFinanceHandler(e) {
    e.preventDefault();
    const formData = {};

    Array.from(e.currentTarget.elements).forEach(
      (field) => field.id && (formData[field.id] = field.value)
    );

    formData["date"] = new Date(formData["date"]);
    formData["user_id"] = session.user.id;

    try {
      let data, error;
      // not recurrent finance
      if (!showRecurrentDialog) {
        ({ data, error } = await supabase.from("finance").insert([formData]));
      } else {
        ({ data, error } = await supabase
          .from("finance")
          .insert(createRecurrentFinances(formData)));
      }

      if (error) {
        throw error;
      }

      if (data) {
        getFinances();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      closeFormHandler();
    }
  }

  function handleRecurrentDialog(e) {
    const cValue = e.currentTarget.value;
    console.log(cValue);
    if (cValue !== "notRecurrent") {
      setShowRecurrentDialog(true);
    } else {
      setShowRecurrentDialog(false);
    }
  }

  return (
    <section className={styles.finance_form}>
      <div className={styles.modal}></div>
      <form className={styles.form} onSubmit={newFinanceHandler}>
        <div className={styles.form_header}>
          <h2>New Finance</h2>
          <AiOutlineClose className={styles.close} onClick={closeFormHandler} />
        </div>

        <input
          type="text"
          id="name"
          required
          placeholder="rent, salary, books ..."
        />

        <label htmlFor="amount" className={styles.form_input_label}>
          <MdAttachMoney />
          <input
            type="number"
            id="amount"
            required
            placeholder="amount"
            className={styles.form_input}
          />
        </label>

        <label htmlFor="category" className={styles.form_input_label}>
          {getCategoryIcon(currentCategory)}
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setCurrentCategory(e.currentTarget.value);
            }}
            className={styles.form_input}
          >
            <option value="home">home</option>
            <option value="sport">sport</option>
            <option value="education">education</option>
            <option value="other">other</option>
          </select>
        </label>

        <label htmlFor="date" className={styles.form_input_label}>
          <BsCalendarFill />
          <input
            type="date"
            id="date"
            required
            defaultValue={dateAsString}
            className={styles.form_input}
          />
        </label>

        <label htmlFor="interval" className={styles.form_input_label}>
          <BsArrowRepeat />
          <select
            name="interval"
            id="interval"
            className={styles.form_input}
            onChange={handleRecurrentDialog}
          >
            <option value="notRecurrent">not recurrent</option>
            <option value="monthly">monthly</option>
            <option value="weekly">weekly</option>
            <option value="yearly">yearly</option>
            <option value="halfYearly">half-yearly</option>
          </select>
        </label>

        {showRecurrentDialog && (
          <label
            htmlFor="recurrent_until_date"
            className={styles.form_input_label}
          >
            until?
            <input
              type="date"
              id="recurrent_until_date"
              required
              defaultValue={dateAsStringInThreeYears}
              className={styles.form_input}
            />
          </label>
        )}

        <button className={styles.btn}>Add</button>
      </form>
    </section>
  );
}
