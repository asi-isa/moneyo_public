import styles from "./AlterFinanceForm.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { supabase } from "../../db/supabase";
import getCategoryIcon from "../../utils/getCategoryIcon";
import createRecurrentFinances from "../../utils/createRecurrentFinances";
import { BsArrowRepeat, BsCalendarFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

export default function AlterFinanceForm(props) {
  console.log("recurrent_id", props.currentFinanceToAlter);
  async function alterFinanceHandler(e) {
    e.preventDefault();
    // e.currentTarget.elements.forEach((field) => console.log(field));
    const formData = { ...props.currentFinanceToAlter };

    Array.from(e.currentTarget.elements).forEach(
      (field) => field.id && (formData[field.id] = field.value)
    );

    // formData["date"] = new Date(formData["date"]);

    console.log("props.currentFinanceToAlter", props.currentFinanceToAlter);
    console.log("formdata", formData);

    try {
      let data, error;
      // update all recurrent finances
      if (props.currentFinanceToAlter.recurrent_id) {
        formData["user_id"] = props.session.user.id;
        // delete all finances
        ({ data, error } = await supabase
          .from("finance")
          .delete()
          .match({ recurrent_id: props.currentFinanceToAlter.recurrent_id }));
        // insert new 'updated' finances
        ({ data, error } = await supabase
          .from("finance")
          .insert(createRecurrentFinances(formData)));
      } else {
        ({ data, error } = await supabase
          .from("finance")
          .update([formData])
          .eq("id", props.currentFinanceToAlter.id));
      }

      // const { data, error } = await supabase
      //   .from("finance")
      //   .update([formData])
      //   .eq("id", props.currentFinanceToAlter.id);

      if (error) {
        throw error;
      }

      if (data) {
        props.getFinances();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      props.closeAlterFinanceFormHandler();
    }
  }

  async function deleteFinanceHandler() {
    try {
      let data, error;
      // delete all recurrent finances
      if (props.currentFinanceToAlter.recurrent_id) {
        ({ data, error } = await supabase
          .from("finance")
          .delete()
          .match({ recurrent_id: props.currentFinanceToAlter.recurrent_id }));
      } else {
        ({ data, error } = await supabase
          .from("finance")
          .delete()
          .match({ id: props.currentFinanceToAlter.id }));
      }

      if (error) {
        throw error;
      }

      if (data) {
        props.getFinances();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      props.closeAlterFinanceFormHandler();
    }
  }

  return (
    <section className={styles.finance_form}>
      <div className={styles.modal}></div>
      <form className={styles.form} onSubmit={alterFinanceHandler}>
        <div className={styles.form_header}>
          <h2>Alter Finance</h2>
          <AiOutlineClose
            className={styles.close}
            onClick={props.closeAlterFinanceFormHandler}
          />
        </div>

        <div className={styles.btn_del} onClick={deleteFinanceHandler}>
          Delete
        </div>

        <input
          type="text"
          id="name"
          required
          defaultValue={props.currentFinanceToAlter.name}
        />

        <label htmlFor="amount" className={styles.form_input_label}>
          <MdAttachMoney />
          <input
            type="number"
            id="amount"
            required
            placeholder="amount"
            defaultValue={props.currentFinanceToAlter.amount}
            className={styles.form_input}
          />
        </label>

        <label htmlFor="category" className={styles.form_input_label}>
          {getCategoryIcon(props.currentFinanceToAlter.category)}
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setCurrentCategory(e.currentTarget.value);
            }}
            className={styles.form_input}
            defaultValue={props.currentFinanceToAlter.category}
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
            defaultValue={props.currentFinanceToAlter.date}
            className={styles.form_input}
          />
        </label>

        <label htmlFor="interval" className={styles.form_input_label}>
          <BsArrowRepeat />
          <select
            name="interval"
            id="interval"
            defaultValue={props.currentFinanceToAlter.interval}
            className={styles.form_input}
          >
            <option value="notRecurrent">not recurrent</option>
            <option value="monthly">monthly</option>
            <option value="weekly">weekly</option>
            <option value="yearly">yearly</option>
            <option value="halfYearly">half-yearly</option>
          </select>
        </label>

        {/* {showRecurrentDialog && (
          <label htmlFor="recurrentDate" className={styles.form_input_label}>
            until?
            <input
              type="date"
              id="date"
              required
              defaultValue={props.currentFinanceToAlter.date}
              className={styles.form_input}
            />
          </label>
        )} */}

        <button className={styles.btn}>Alter</button>
      </form>
    </section>
  );
}
