"use client";
import { getWeekBabyByNumber } from "@/lib/journey-api";
import css from "./BabyJourney.module.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const BabyJourney = ({ week }: { week: number }) => {
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["baby"],
  //     queryFn: () => getWeekBabyByNumber(week),
  //   });
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (!data) {
  //     return null;
  //   }
  return (
    <div className={css.detailsBaby}>
      {/* <Image src={data.image} alt={data.analogy} />
      <p>{data.analogy}</p>
      <p>{data.description}</p>
      <div>
        <h3>Цікавий факт тижня</h3>
        <p>{data.interestingFact}</p>
      </div> */}
    </div>
  );
};

export default BabyJourney;
