"use client";

import { useRef, useState } from "react";
import css from "./CustomScroll.module.css";
interface CustomScrollProps {
  children: React.ReactNode;
}
export default function CustomScroll({ children }: CustomScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const thumbHeight = 56;

  const updateThumb = () => {
    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const maxScroll = content.scrollHeight - content.clientHeight;
    const maxThumbTop = track.clientHeight - thumbHeight;

    if (maxScroll <= 0) return;

    const percent = content.scrollTop / maxScroll;
    setThumbTop(percent * maxThumbTop);
  };

  const moveThumb = (clientY: number) => {
    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const trackRect = track.getBoundingClientRect();

    let newTop = clientY - trackRect.top - thumbHeight / 2;

    const maxThumbTop = track.clientHeight - thumbHeight;

    if (newTop < 0) newTop = 0;
    if (newTop > maxThumbTop) newTop = maxThumbTop;

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

  return (
    <div className={css.wrapper}>
      <div
        ref={contentRef}
        className={css.content}
        onScroll={updateThumb}>
        {children}
      </div>

      <div
        ref={trackRef}
        className={css.scrollbar}>
        <div
          className={css.thumb}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      </div>
    </div>
  );
}
