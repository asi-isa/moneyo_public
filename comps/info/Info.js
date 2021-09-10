import styles from "./Info.module.css";
import { motion } from "framer-motion";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function Info({ headerText, text, closeInfo }) {
  return (
    <motion.article
      className={styles.info}
      initial={{ y: "-100vh" }}
      animate={{ y: 0, x: "-50%" }}
    >
      <AiOutlineCloseSquare className={styles.close_btn} onClick={closeInfo} />
      <h5 className={styles.header}>{headerText}</h5>
      <p className={styles.text}>{text}</p>
    </motion.article>
  );
}
