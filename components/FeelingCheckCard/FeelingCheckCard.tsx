"use client";

type FeelingCheckCardProps = {
  recommendation: string;
  isAuthorized: boolean;
  onDiaryClick: () => void;
};

const FeelingCheckCard = ({
  recommendation,
  isAuthorized,
  onDiaryClick,
}: FeelingCheckCardProps) => {
  return (
    <div>
      <h2>Як ви себе почуваєте?</h2>
      <div>
        <p>
          <strong>Рекомендація на сьогодні:</strong>
        </p>
        <p>{recommendation}</p>
      </div>
      <button onClick={onDiaryClick}>Зробити запис у щоденник</button>
    </div>
  );
};

export default FeelingCheckCard;
