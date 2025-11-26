"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  formatOptionLabel?: (option: string) => string; // додано
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Choose an option",
  formatOptionLabel, // додано
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      <div ref={ref} className={styles.selectBox}>
        <button
          type="button"
          className={styles.selected}
          onClick={() => setOpen((prev) => !prev)}
        >
          {value
            ? formatOptionLabel
              ? formatOptionLabel(value)
              : value
            : placeholder}
          <svg
            className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {open && (
          <ul className={styles.options}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`${styles.option} ${
                  value === option ? styles.activeOption : ""
                }`}
              >
                {formatOptionLabel ? formatOptionLabel(option) : option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
