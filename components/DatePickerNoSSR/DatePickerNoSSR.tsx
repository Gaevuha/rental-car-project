"use client";

import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      <div className="custom-datepicker-header">
        <div className="custom-header-top">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="custom-nav-button custom-nav-prev"
            type="button"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="custom-month-year">
            {date.toLocaleString("en", { month: "long" })} {date.getFullYear()}
          </div>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="custom-nav-button custom-nav-next"
            type="button"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="custom-week-days">
          {weekDays.map((day) => (
            <div key={day} className="custom-week-day">
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Кастомні класи для днів
  const dayClassName = (date: Date) => {
    const baseClass = "custom-datepicker-day";
    const classes = [baseClass];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    if (currentDate.getTime() === today.getTime()) {
      classes.push("custom-datepicker-day--today");
    }

    if (selected && currentDate.getMonth() !== selected.getMonth()) {
      classes.push("custom-datepicker-day--outside-month");
    }

    if (currentDate.getTime() < today.getTime()) {
      classes.push("custom-datepicker-day--disabled");
    }

    return classes.join(" ");
  };

  // Функції для класів місяця та тижня
  const monthClassName = () => "custom-datepicker-month";
  const weekClassName = () => "custom-datepicker-week";

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
      // Основні класи для кастомізації
      popperClassName="custom-datepicker-popper"
      calendarClassName="custom-datepicker-calendar"
      wrapperClassName="custom-datepicker-wrapper"
      monthClassName={monthClassName}
      weekClassName={weekClassName}
      // Класи для конкретних елементів
      dayClassName={dayClassName}
      weekDayClassName={() => "custom-datepicker-weekday"}
      // Кастомний заголовок
      renderCustomHeader={renderCustomHeader}
      // Налаштування відображення
      showPopperArrow={false}
      formatWeekDay={() => ""} // Приховуємо стандартні дні тижня
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      fixedHeight
      inline={false}
      // Додаткові пропси для кращого контролю
      disabledKeyboardNavigation={false}
      adjustDateOnChange={true}
      shouldCloseOnSelect={true}
    />
  );
};

export default DatePickerNoSSR;
