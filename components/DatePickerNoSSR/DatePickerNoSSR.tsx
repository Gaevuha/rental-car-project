"use client";

import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../BookingForm/BookingForm.module.css";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
  placeholderText?: string;
  className?: string;
}

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const DatePickerNoSSR: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  onCalendarOpen,
  onCalendarClose,
  placeholderText,
  className,
}) => {
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: CustomHeaderProps) => {
    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
      <div className={styles.customHeader}>
        <div className={styles.headerTop}>
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={`${styles.navButton} custom-nav-button custom-nav-prev`}
            type="button"
          >
            <svg className="iconArrow">
              <use href="/icons/sprite.svg#icon-arrow" />
            </svg>
          </button>

          <div className={styles.monthYear}>
            {date.toLocaleString("en", { month: "long" })} {date.getFullYear()}
          </div>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={`${styles.navButton} custom-nav-button custom-nav-next`}
            type="button"
          >
            <svg className="iconArrowRotate">
              <use href="/icons/sprite.svg#icon-arrow" />
            </svg>
          </button>
        </div>

        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const dayClassName = (date: Date) => {
    const today = new Date();
    const day = new Date(date);

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    const classes = ["custom-datepicker-day"];

    if (dayStart.getTime() === todayStart.getTime()) {
      classes.push("custom-datepicker-day--today");
    }

    if (dayStart < todayStart) {
      classes.push("custom-datepicker-day--disabled");
    }

    return classes.join(" ");
  };

  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      onCalendarOpen={onCalendarOpen}
      onCalendarClose={onCalendarClose}
      placeholderText={placeholderText}
      className={className}
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      popperClassName="custom-datepicker-popper"
      calendarClassName="custom-datepicker-calendar"
      wrapperClassName="custom-datepicker-wrapper"
      monthClassName={() => "custom-datepicker-month"}
      weekClassName={() => "custom-datepicker-week"}
      dayClassName={dayClassName}
      weekDayClassName={() => "custom-datepicker-weekday"}
      renderCustomHeader={renderCustomHeader}
      showPopperArrow={false}
      formatWeekDay={() => ""}
      fixedHeight
    />
  );
};

export default DatePickerNoSSR;
