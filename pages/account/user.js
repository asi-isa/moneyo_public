import styles from "../../styles/User.module.css";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function User() {
  return (
    <section className={styles.user}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.goback}>
            <IoIosArrowBack />
          </a>
        </Link>
        <h1 className={styles.title}>user</h1>
      </div>

      <Link href="/account/logout">
        <a className={styles.btn}>log out</a>
      </Link>
    </section>
  );
}
