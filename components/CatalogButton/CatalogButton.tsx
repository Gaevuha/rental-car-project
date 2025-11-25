"use client";

import Link from "next/link";
import styles from "./CatalogButton.module.css";

const CatalogButton = () => {
  const handleClick = () => {
    // Встановлюємо activeNav = "catalog"
    sessionStorage.setItem("activeNav", "catalog");
  };

  return (
    <Link href="/catalog" className={styles.catalog__btn} onClick={handleClick}>
      View Catalog
    </Link>
  );
};

export default CatalogButton;
