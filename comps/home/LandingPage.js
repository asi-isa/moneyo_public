import styles from "./LandingPage.module.css";
import Link from "next/link";
import Particles from "react-particles-js";
import { AiTwotoneFire } from "react-icons/ai";

export default function LandingPage() {
  return (
    <>
      <section className={styles.home}>
        <div className={styles.header}>
          <h1 className={styles.title}>moneyo</h1>
          <h5 className={styles.subtitle}>manage your finances</h5>
        </div>

        <div className={styles.auth_cards}>
          <Link href="/account/signin">
            <a className={styles.auth_card}>sign in</a>
          </Link>
          <Link href="/learnmore">
            <a className={styles.auth_card_learn}>learn more</a>
          </Link>
        </div>

        <article className={styles.copyright}>
          made with <AiTwotoneFire /> by{" "}
          <a className={styles.isatech}>isa_tech</a>
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
