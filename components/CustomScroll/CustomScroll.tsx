'use client';

import { useEffect, useRef, useState } from 'react';
import css from './CustomScroll.module.css';

interface CustomScrollProps {
  children: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function CustomScroll({
  children,
  onScroll,
}: CustomScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(56);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);

  const updateScrollbar = () => {
    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const hasScroll = content.scrollHeight > content.clientHeight;
    setShowScrollbar(hasScroll);

    if (!hasScroll) {
      setThumbTop(0);
      return;
    }

    const newThumbHeight = Math.max(
      40,
      (content.clientHeight / content.scrollHeight) * track.clientHeight
    );

    const maxScroll = content.scrollHeight - content.clientHeight;
    const maxThumbTop = track.clientHeight - newThumbHeight;
    const percent = content.scrollTop / maxScroll;

    setThumbHeight(newThumbHeight);
    setThumbTop(percent * maxThumbTop);
  };

  const moveThumb = (clientY: number) => {
    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const maxThumbTop = track.clientHeight - thumbHeight;
    if (maxThumbTop <= 0) return;

    const trackRect = track.getBoundingClientRect();
    let newTop = clientY - trackRect.top - thumbHeight / 2;

    newTop = Math.max(0, Math.min(newTop, maxThumbTop));

    const percent = newTop / maxThumbTop;

    content.scrollTop = percent * (content.scrollHeight - content.clientHeight);

    setThumbTop(newTop);
  };

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const drag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    moveThumb(e.clientY);
  };

  const stopDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    updateScrollbar();

    window.addEventListener('resize', updateScrollbar);

    return () => {
      window.removeEventListener('resize', updateScrollbar);
    };
  }, [children]);

  return (
    <div className={css.wrapper}>
      <div
        ref={contentRef}
        className={css.content}
        onScroll={e => {
          updateScrollbar();
          onScroll?.(e);
        }}
      >
        {children}
      </div>

      <div
        ref={trackRef}
        className={`${css.scrollbar} ${!showScrollbar ? css.hidden : ''}`}
      >
        <div
          className={css.thumb}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      </div>
    </div>
  );
}
