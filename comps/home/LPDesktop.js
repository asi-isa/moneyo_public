import styles from "./LPDesktop.module.css";

import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import LPMobile from "./LPMobile";

export default function LPDesktop() {
  return (
    <section className={styles.lp_desktop}>
      <div className={styles.content}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Link href="/">
                  <a className={styles.link}>
                    <h1 className={styles.link_title}>moneyo</h1>
                  </a>
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/">
                  <a className={styles.link}>docs</a>
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/">
                  <a className={styles.link}>about</a>
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/">
                  <a className={styles.link}>contact</a>
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/account/signin">
                  <a className={styles.link_outline}>sign in</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className={styles.info_content}>
          <div className={styles.info}>
            <div className={styles.info_header}>
              <h5 className={styles.suptitle}>
                start today and enjoy the freedom
              </h5>
              <h1 className={styles.title}>
                manage your finances before they manage you
              </h1>
              <h5 className={styles.subtitle}>
                the missing part between you and healthy financial habits
              </h5>
            </div>
            <div className={styles.ctas}>
              <div className={styles.cta}>
                <FaApple />
                <a href="/">Apple Store</a>
              </div>
              <div className={styles.cta}>
                <IoLogoGooglePlaystore />
                <a href="/">Play Store</a>
              </div>
            </div>
          </div>

          <div className={styles.con_con}>
            <div className={styles.preview_container}>
              <LPMobile />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
