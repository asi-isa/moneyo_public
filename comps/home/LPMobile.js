import styles from "./LPMobile.module.css";

import Link from "next/link";

import Particles from "react-particles-js";
import { AiTwotoneFire } from "react-icons/ai";

export default function LPMobile() {
  return (
    <section className={styles.lp_mobile}>
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
                speed: 2,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 0.7,
              direction: "top",
              out_mode: "out",
            },
          },
        }}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>moneyo</h1>
          <h5 className={styles.subtitle}>manage your finances</h5>
        </div>

        <div className={styles.ctas}>
          <Link href="/account/signin">
            <a className={styles.cta}>sign in</a>
          </Link>
          <Link href="/learnmore">
            <a className={styles.cta_active}>learn more</a>
          </Link>
        </div>
      </div>

      <article className={styles.copyright}>
        made with <AiTwotoneFire /> by{" "}
        <a className={styles.isatech} href="https://github.com/asi-isa">
          isa_tech
        </a>
      </article>
    </section>
  );
}
