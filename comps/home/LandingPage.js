import styles from "./LandingPage.module.css";
import Link from "next/link";
import Particles from "react-particles-js";
import { AiTwotoneFire } from "react-icons/ai";
import { useState } from "react";

export default function LandingPage() {
  return (
    <>
      <section className={styles.home}>
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

        <div className={styles.home_container}>
          <div className={styles.info}>
            <div className={styles.header}>
              <h1 className={styles.title}>moneyo</h1>
              <h5 className={styles.subtitle}>manage your finances</h5>

              <h5 className={styles.suptitle_dt}>
                start today and enjoy the freedom
              </h5>
              <h1 className={styles.title_dt}>
                manage your finances before they manage you
              </h1>
              <h5 className={styles.subtitle_dt}>
                the missing part between you and healthy financial habits
              </h5>
            </div>
            <div className={styles.auth_cards}>
              <Link href="/account/signin">
                <a className={styles.auth_card}>sign in</a>
              </Link>
              <Link href="/learnmore">
                <a className={styles.auth_card_learn}>learn more</a>
              </Link>
            </div>
          </div>
          <div className={styles.vid_con}>
            <video className={styles.vid} autoPlay loop muted>
              <source src="/videos/moneyo_vid_preview.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <article className={styles.copyright}>
          made with <AiTwotoneFire /> by{" "}
          <a className={styles.isatech} href="https://github.com/asi-isa">
            isa_tech
          </a>
        </article>

        <Particles
          className={styles.particles}
          params={{
            particles: {
              number: {
                value: 120,
                density: {
                  enable: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  speed: 4,
                  size_min: 0.3,
                },
              },
              line_linked: {
                enable: false,
              },
              move: {
                random: true,
                speed: 1,
                direction: "top",
                out_mode: "out",
              },
            },
            // interactivity: {
            //   events: {
            //     onhover: {
            //       enable: true,
            //       mode: "bubble",
            //     },
            //     onclick: {
            //       enable: true,
            //       mode: "repulse",
            //     },
            //   },
            //   modes: {
            //     bubble: {
            //       distance: 250,
            //       duration: 2,
            //       size: 0,
            //       opacity: 0,
            //     },
            //     repulse: {
            //       distance: 400,
            //       duration: 4,
            //     },
            //   },
            // },
          }}
        />
      </section>
    </>
  );
}
