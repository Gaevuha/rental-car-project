"use client";

import Image from "next/image";
import React from "react";
import { Car } from "@/types/car";
import styles from "./DetailCatalogPage.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";

interface Props {
  car: Car;
}

export default function DetailCatalogPage({ car }: Props) {
  const formatLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts[1] || "";
    const country = parts[2] || "";

    return (
      <>
        <span className={styles.city}>{city},</span>
        <span className={styles.country}>{country}</span>
        <span className={styles.mileage}>
          Mileage: {car.mileage.toLocaleString()} km
        </span>
      </>
    );
  };

  return (
    <section className={`${styles.sectionDetailCar} section`}>
      <div className={`${styles.containerDetailCar} container`}>
        <div className={styles.leftColumn}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={600}
            height={400}
            className={styles.carImage}
          />
          <BookingForm
            className={styles.bookingForm}
            carId={car.id}
            carName={`${car.brand} ${car.model}`}
          />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.carWrapperContent}>
            <h2 className={styles.carByTitle}>
              {car.brand} <span className={styles.carModel}>{car.model}</span>,
              <span className={styles.carYear}>{car.year}</span>
              <span className={styles.carId}>id:{car.id.split("-")[0]}</span>
            </h2>

            <div className={styles.locationWrapper}>
              <svg className={styles.iconLocation}>
                <use href="/icons/sprite.svg#icon-location" />
              </svg>
              <p className={styles.location}>{formatLocation(car.address)}</p>
            </div>

            <p className={styles.carPriceAccent}>${car.rentalPrice}</p>
            <p className={styles.text}>{car.description}</p>

            <ul className={styles.carList}>
              <li className={styles.carItem}>
                <h3 className={styles.carTitleItem}>Rental Conditions:</h3>
                {car.rentalConditions.map((cond, idx) => (
                  <p key={idx} className={styles.carTextItem}>
                    <svg className={styles.iconLocation}>
                      <use href="/icons/sprite.svg#icon-check-circle" />
                    </svg>
                    {cond}
                  </p>
                ))}
              </li>

              <li className={styles.carItem}>
                <h3 className={styles.carTitleItem}>Car Specifications:</h3>
                <p className={styles.carTextItem}>
                  <svg className={styles.iconLocation}>
                    <use href="/icons/sprite.svg#icon-calendar" />
                  </svg>
                  Year: {car.year}
                </p>
                <p className={styles.carTextItem}>
                  <svg className={styles.iconLocation}>
                    <use href="/icons/sprite.svg#icon-car" />
                  </svg>
                  Type: {car.type}
                </p>
                <p className={styles.carTextItem}>
                  <svg className={styles.iconLocation}>
                    <use href="/icons/sprite.svg#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </p>
                <p className={styles.carTextItem}>
                  <svg className={styles.iconLocation}>
                    <use href="/icons/sprite.svg#icon-gear" />
                  </svg>
                  Engine Size: {car.engineSize}
                </p>
              </li>

              <li className={styles.carItem}>
                <h3 className={styles.carTitleItem}>
                  Accessories & Functionalities:
                </h3>
                {car.accessories
                  .concat(car.functionalities)
                  .map((item, idx) => (
                    <p key={idx} className={styles.carTextItem}>
                      <svg className={styles.iconLocation}>
                        <use href="/icons/sprite.svg#icon-check-circle" />
                      </svg>
                      {item}
                    </p>
                  ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
