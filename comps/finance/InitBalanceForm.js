import styles from "./InitBalanceForm.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { supabase } from "../../db/supabase";

export default function InitBalanceForm({
  session,
  closeFormHandler,
  getInitBalance,
}) {
  async function submitHandler(e) {
    e.preventDefault();

    const init_balance = +e.currentTarget.elements[0].value;

    try {
      let { data, error } = await supabase
        .from("finance_user")
        .update({ init_balance })
        .match({ id: session.user.id });

      if (error) throw error;

      if (data) {
        getInitBalance();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      closeFormHandler();
    }
  }

  return (
    <>
      <div className={styles.modal}></div>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.form_header}>
          <h2>initial balance</h2>
          <AiOutlineClose className={styles.close} onClick={closeFormHandler} />
        </div>

        <p className={styles.info}>
          before we begin lets capture our current balance
        </p>

        <label htmlFor="initialBalance" className={styles.form_input_label}>
          <MdAttachMoney />
          <input
            type="number"
            id="initialBalance"
            required
            placeholder="amount"
            className={styles.form_input}
          />
        </label>

        <button className={styles.btn}>add</button>
      </form>
    </>
  );
}
