"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

const NavigationClient = () => {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState<null | "home" | "catalog">(null);

  useEffect(() => {
    queueMicrotask(() => setHydrated(true));

    const saved = sessionStorage.getItem("activeNav") as
      | "home"
      | "catalog"
      | null;

    if (saved) {
      queueMicrotask(() => {
        if (saved === "home" && pathname === "/") setActive("home");
        else if (saved === "catalog" && pathname === "/catalog")
          setActive("catalog");
        else setActive(null);
      });
    }
  }, [pathname]);

  const handleClick = (item: "home" | "catalog") => {
    setActive(item);
    sessionStorage.setItem("activeNav", item);
  };

  const isActive = (item: "home" | "catalog") => {
    if (!hydrated) return false;
    if (pathname !== "/" && pathname !== "/catalog") return false;
    return active === item;
  };

  return (
    <nav aria-label="Main Navigation">
      <ul className={styles.navigation}>
        <li>
          <Link
            href="/"
            onClick={() => handleClick("home")}
            className={`${styles.headerLink} ${
              isActive("home") ? styles.active : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/catalog"
            onClick={() => handleClick("catalog")}
            className={`${styles.headerLink} ${
              isActive("catalog") ? styles.active : ""
            } ${styles.accent}`}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationClient;
