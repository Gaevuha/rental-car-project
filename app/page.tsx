import styles from "./Page.module.css";
import CatalogButton from "@/components/CatalogButton/CatalogButton";

export default function Home() {
  return (
    <section className={`${styles.hero} section`}>
      <div className={`${styles.container__hero} container`}>
        <div className={styles.intro}>
          <h1>Find your perfect rental car</h1>
          <p>Reliable and budget-friendly rentals for any journey</p>
          <CatalogButton />
        </div>
      </div>
    </section>
  );
}
