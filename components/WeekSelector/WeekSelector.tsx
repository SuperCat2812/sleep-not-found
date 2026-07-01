'use client';
import { useParams, useRouter } from 'next/navigation';
import css from './WeekSelector.module.css';
import { BlossomCarousel } from '@blossom-carousel/react';
import { useEffect, useRef } from 'react';

interface WeekSelectorProps {
  currentWeek: number;
}

function WeekSelector({ currentWeek }: WeekSelectorProps) {
  const router = useRouter();
  const params = useParams();
  const activeWeek = Number(params.weekNumber);
  const activeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const active = activeRef.current;
    if (!active) return;

    const carousel =
      (active.closest('[class*="carousel"]') as HTMLElement) ??
      active.parentElement;
    if (!carousel) return;

    const carouselRect = carousel.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    carousel.scrollLeft +=
      activeRect.left -
      carouselRect.left -
      carouselRect.width / 2 +
      activeRect.width / 2;
  }, []);

  return (
    <div className={css.stick}>
      <BlossomCarousel as="ul" className={css.carousel}>
        {Array.from({ length: 42 }, (_, index) => {
          const week = index + 1;
          const isActive = week === activeWeek;
          const isDisabled = week > currentWeek;

          return (
            <li
              key={week}
              ref={isActive ? activeRef : null}
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
    </div>
  );
}

export default WeekSelector;
