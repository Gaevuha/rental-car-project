"use client";

import React from "react";
import { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <li className="car-card">
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={300}
        height={200}
        className="car-img"
      />

      <h3>
        {car.brand} {car.model}
      </h3>
      <p>Рік: {car.year}</p>
      <p>Тип: {car.type}</p>
      <p>Ціна за день: ${car.rentalPrice}</p>
      <p>Пробіг: {car.mileage.toLocaleString()} km</p>

      <Link href={`/catalog/${car.id}`}>Read more</Link>
    </li>
  );
};

export default CarCard;
