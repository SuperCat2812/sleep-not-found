"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import css from "./DueDatePicker.module.css";

interface DueDatePickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  minDate: string;
  maxDate: string;
  placeholder?: string;
}

const monthNames = [
  "січень",
  "лютий",
  "березень",
  "квітень",
  "травень",
  "червень",
  "липень",
  "серпень",
  "вересень",
  "жовтень",
  "листопад",
  "грудень",
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (value: string) => {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  return `${day}.${month}.${year}`;
};

const parseDateValue = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const isSameDay = (date: Date, value: string) => {
  if (!value) {
    return false;
  }

  return formatDateValue(date) === value;
};

const isBeforeDate = (date: Date, minDate: string) => {
  return formatDateValue(date) < minDate;
};

const isAfterDate = (date: Date, maxDate: string) => {
  return formatDateValue(date) > maxDate;
};

export default function DueDatePicker({
  id = "dueDate",
  name = "dueDate",
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "дд. мм. рррр",
}: DueDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? parseDateValue(value) : null;
  const minDateObject = parseDateValue(minDate);

  const [visibleMonth, setVisibleMonth] = useState(() => {
    return selectedDate || minDateObject;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setVisibleMonth(selectedDate);
    }
  }, [value]);

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekDay = firstDayOfMonth.getDay() || 7;
    const startDate = new Date(year, month, 1 - (firstWeekDay - 1));

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return date;
    });
  }, [visibleMonth]);

  const handlePreviousMonth = () => {
    setVisibleMonth((current) => {
      const nextDate = new Date(current);
      nextDate.setMonth(current.getMonth() - 1);
      return nextDate;
    });
  };

  const handleNextMonth = () => {
    setVisibleMonth((current) => {
      const nextDate = new Date(current);
      nextDate.setMonth(current.getMonth() + 1);
      return nextDate;
    });
  };

  const handleSelectDate = (date: Date) => {
    const dateValue = formatDateValue(date);

    if (dateValue < minDate || dateValue > maxDate) {
      return;
    }

    onChange(dateValue);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <input type="hidden" id={id} name={name} value={value} />

      <button
        type="button"
        className={`${css.trigger} ${isOpen ? css.triggerOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? css.value : css.placeholder}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className={css.calendar}>
          <div className={css.calendarHeader}>
            <button
              type="button"
              className={css.navButton}
              onClick={handlePreviousMonth}
              aria-label="Попередній місяць"
            >
              ‹
            </button>

            <p className={css.monthTitle}>
              {monthNames[visibleMonth.getMonth()]}{" "}
              {visibleMonth.getFullYear()}
            </p>

            <button
              type="button"
              className={css.navButton}
              onClick={handleNextMonth}
              aria-label="Наступний місяць"
            >
              ›
            </button>
          </div>

          <div className={css.weekDays}>
            {weekDays.map((day) => (
              <span key={day} className={css.weekDay}>
                {day}
              </span>
            ))}
          </div>

          <div className={css.days}>
            {calendarDays.map((date) => {
              const dateValue = formatDateValue(date);
              const isCurrentMonth =
                date.getMonth() === visibleMonth.getMonth();
              const isDisabled =
                isBeforeDate(date, minDate) || isAfterDate(date, maxDate);
              const isSelected = isSameDay(date, value);

              return (
                <button
                  key={dateValue}
                  type="button"
                  className={`${css.day} ${
                    !isCurrentMonth ? css.dayOutside : ""
                  } ${isSelected ? css.daySelected : ""}`}
                  onClick={() => handleSelectDate(date)}
                  disabled={isDisabled}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}