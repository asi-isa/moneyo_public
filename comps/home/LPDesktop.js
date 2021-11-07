import styles from "./LPDesktop.module.css";

import Link from "next/link";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import LPMobile from "./LPMobile";
import ComingSoon from "../card/ComingSoon";
import { useState } from "react";

export default function LPDesktop() {
  const [showComingSoon, setShowComingSoon] = useState(true);

  return (
    <>
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
                  <Link href="/account/signup">
                    <a className={styles.link_outline}>sign up</a>
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
                  manage your finances{" "}
                  <span className={styles.underline}>before</span> they manage
                  you
                </h1>
                <h5 className={styles.subtitle}>
                  the missing part between you and healthy financial habits
                </h5>
              </div>
              <div className={styles.ctas}>
                <div
                  className={styles.cta}
                  onClick={() => setShowComingSoon(true)}
                >
                  <FaApple />
                  {/* <a href="/">Apple Store</a> */}
                  Apple Store
                </div>
                <div
                  className={styles.cta}
                  onClick={() => setShowComingSoon(true)}
                >
                  <IoLogoGooglePlaystore />
                  {/* <a href="/">Play Store</a> */}
                  Play Store
                </div>
              </div>
            </div>

            <div className={styles.preview_con_con}>
              <div className={styles.preview_container}>
                <LPMobile />
              </div>
            </div>
          </div>
        </div>
      </section>
      {showComingSoon && (
        <ComingSoon closeSelf={() => setShowComingSoon(false)} />
      )}
    </>
  );
}
