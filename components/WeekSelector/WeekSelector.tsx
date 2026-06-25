"use client";
import { useParams, useRouter } from "next/navigation";
import css from "./WeekSelector.module.css";
import { BlossomCarousel } from "@blossom-carousel/react";
interface WeekSelectorProps {
  currentWeek: number;
}
function WeekSelector({ currentWeek }: WeekSelectorProps) {
  const router = useRouter();
  const params = useParams();
  const activeWeek = Number(params.weekNumber);
  return (
    <BlossomCarousel as="ul" className={css.carousel}>
      {Array.from({ length: 42 }, (_, index) => {
        const week = index + 1;
        const isActive = week === activeWeek;
        const isDisabled = week > currentWeek;

        return (
          <li
            key={week}
            className={css.slide}
            onClick={() => {
              if (isDisabled) return;
              router.push(`/journey/${week}`);
            }}
            data-active={isActive}
            data-disabled={isDisabled}
          >
            <p className={css.day}>{week}</p>
            <p className={css.week}>Тиждень</p>
          </li>
        );
      })}
    </BlossomCarousel>
  );
}

export default WeekSelector;
