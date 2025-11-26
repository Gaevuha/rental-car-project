"use client";

import React from "react";
import { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts[1] || "";
    const country = parts[2] || "";
    return `${city} | ${country} | ${car.rentalCompany} |`;
  };

  return (
    <li className={styles.carCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>
          {car.brand} <span className={styles.carModel}>{car.model}</span>,
          <span className={styles.carYear}>{car.year}</span>
          <span className={styles.carPrice}>${car.rentalPrice}</span>
        </h3>
        <div className={styles.details}>
          <span className={styles.location}>{formatLocation(car.address)}</span>
          <span className={styles.typeMileage}>
            {car.type} | {car.mileage.toLocaleString()} km
          </span>
        </div>
      </div>
      <Link href={`/catalog/${car.id}`} className={styles.readMoreLink}>
        Read more
      </Link>
      <button type="button" className={styles.favoritesBtn}>
        <svg className={styles.iconFavorites}>
          <use href="/icons/sprite.svg#icon-favorites" />
        </svg>
      </button>
    </li>
  );
};

export default CarCard;
