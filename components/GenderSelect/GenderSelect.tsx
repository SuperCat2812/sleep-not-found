'use client';

import { useEffect, useRef, useState } from 'react';
import css from './GenderSelect.module.css';

export type GenderValue = 'boy' | 'girl' | 'unknown' | '';

interface GenderSelectProps {
  value: GenderValue;
  onChange: (value: GenderValue) => void;
  name?: string;
  id?: string;
  placeholder?: string;
}

const genderOptions: Array<{ value: Exclude<GenderValue, ''>; label: string }> =
  [
    { value: 'boy', label: 'Хлопчик' },
    { value: 'girl', label: 'Дівчинка' },
    { value: 'unknown', label: 'Ще не знаю' },
  ];

export default function GenderSelect({
  value,
  onChange,
  name = 'babyGender',
  id = 'babyGender',
  placeholder = 'Оберіть стать',
}: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = genderOptions.find(option => option.value === value);
  const selectedLabel = selectedOption?.label ?? placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: GenderValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${css.wrapper} ${isOpen ? css.wrapperOpen : ''}`}
    >
      <input type="hidden" id={id} name={name} value={value} />

      <button
        type="button"
        className={`${css.trigger} ${isOpen ? css.triggerOpen : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? css.value : css.placeholder}>
          {selectedLabel}
        </span>

        <span className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}>▾</span>
      </button>

      {isOpen && (
        <ul className={css.dropdown} role="listbox">
          {genderOptions.map(option => (
            <li key={option.value} className={css.item}>
              <button
                type="button"
                className={`${css.option} ${
                  option.value === value ? css.optionSelected : ''
                }`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
