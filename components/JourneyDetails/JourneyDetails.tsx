"use client";
import { useState } from "react";
import css from "./JourneyDetails.module.css";
import { useParams } from "next/navigation";
import BabyJourney from "./BabyJourney/BabyJourney";

type Tab = "baby" | "mom";

function JourneyDetails() {
  const [tab, setTab] = useState<Tab>("baby");
  const params = useParams();
  const activeWeek = Number(params.weekNumber);

  return (
    <div className={css.detailsWrapper}>
      <div className={css.toggle}>
        <button
          className={css.button}
          type="button"
          onClick={() => setTab("baby")}
          data-active={tab === "baby"}
        >
          Розвиток малюка
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => setTab("mom")}
          data-active={tab === "mom"}
        >
          Тіло мами
        </button>
      </div>
      {tab === "baby" && <BabyJourney week={activeWeek} />}
      {tab === "mom" && <div className={css.detailsMom}></div>}
    </div>
  );
}

export default JourneyDetails;
