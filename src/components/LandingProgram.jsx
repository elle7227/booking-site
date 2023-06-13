import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

//indbygget funktion der kun henter data når du bygger siden aka. når du laoder siden.
/*export async function getStaticProps() {
  return { props: { isLanding: true } };
}*/

export default function LandingProgram({ bandData }) {
  return (
    <>
      <Head>
        <title>Foo Festival</title>
      </Head>
      <section className={styles.programContainer}>
        <h2>ARTISTS</h2>
        {bandData.slice(0, 15).map((band) => (
          <p className={styles.programText} key={band.bandData}>
            {" " + band.name} /
          </p>
        ))}
        <Link className={styles.link1} href="/program">
          See full program
        </Link>
      </section>
    </>
  );
}
