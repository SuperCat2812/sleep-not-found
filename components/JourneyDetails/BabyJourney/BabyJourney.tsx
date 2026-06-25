"use client";
import { getWeekBabyByNumber } from "@/lib/journey-api";
import css from "./BabyJourney.module.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";

const BabyJourney = ({ week }: { week: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["baby", week],
    queryFn: () => getWeekBabyByNumber(week),
  });
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }
  return (
    <div className={css.detailsBaby}>
      <Image
        className={css.babyImage}
        src={data.image}
        alt={data.analogy}
        width={287}
        height={379}
      />
      <p className={css.analogy}>{data.analogy}</p>
      {data.description.map((text, index) => {
        return (
          <p className={css.description} key={index}>
            {text}
          </p>
        );
      })}
      <div>
        <h3 className={css.fact}>Цікавий факт тижня</h3>
        <p className={css.factDescription}>{data.interestingFact}</p>
      </div>
    </div>
  );
};

export default BabyJourney;
