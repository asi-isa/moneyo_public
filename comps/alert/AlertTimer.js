import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./AlertTimer.module.css";

export default function AlertTimer({ counterBeginsAt, text, footertext }) {
  const [counter, setCounter] = useState(counterBeginsAt);
  const router = useRouter();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (counter > 0) setCounter(counter - 1); // if (...) um das anzeigen von negativen Werten zu verhindern
      if (counter === 0) router.push("/");
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [counter]);

  return (
    <article className={styles.alert}>
      <h2 className={styles.title}>success!</h2>
      <p className={styles.info}>{text}</p>
      <p className={styles.info}>
        in{" "}
        <span className={styles.bold}>
          {" "}
          {counter >= 10 ? counter : "0" + counter}
        </span>{" "}
        seconds you will be redirect to the home page
      </p>

      <h3 className={styles.thanks}>{footertext}</h3>
    </article>
  );
}
