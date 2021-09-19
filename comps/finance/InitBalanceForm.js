import styles from "./InitBalanceForm.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { supabase } from "../../db/supabase";

export default function InitBalanceForm({ session, closeFormHandler }) {
  async function submitHandler(e) {
    e.preventDefault();

    const formData = {};

    Array.from(e.currentTarget.elements).forEach(
      (field) => field.id && (formData[field.id] = field.value)
    );

    const init_balance =
      +formData["bankAssetAmount"] + +formData["liquidAssetAmount"];

    console.log(session);

    try {
      let { data, error } = await supabase
        .from("finance_user")
        .update({ init_balance })
        .match({ id: session.user.id });

      if (error) throw error;

      // if (data) {
      //   getFinances();
      // }
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
          <h2>Init Balance</h2>
          <AiOutlineClose className={styles.close} onClick={closeFormHandler} />
        </div>

        <input type="text" id="bankAssets" required placeholder="bank assets" />
        <label htmlFor="bankAssetAmount" className={styles.form_input_label}>
          <MdAttachMoney />
          <input
            type="number"
            id="bankAssetAmount"
            required
            placeholder="amount"
            className={styles.form_input}
          />
        </label>

        <input type="text" id="liquidAssets" placeholder="liquid assets" />
        <label htmlFor="liquidAssetAmount" className={styles.form_input_label}>
          <MdAttachMoney />
          <input
            type="number"
            id="liquidAssetAmount"
            placeholder="amount"
            className={styles.form_input}
          />
        </label>

        <button className={styles.btn}>Add</button>
      </form>
    </>
  );
}
