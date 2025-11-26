// components/Header/Header.tsx
import styles from "./Header.module.css";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";

const Header = async () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container__header} container`}>
        <Link className={styles.headerLink} href="/" aria-label="Home">
          <svg className={styles.logo}>
            <use href="/icons/sprite.svg#icon-logo" />
          </svg>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
