import Image from "next/image";

type BabyTodayCardProps = {
  imageUrl: string;
  size: string;
  weight: string;
  activity: string;
  description: string;
};

const BabyTodayCard = ({
  imageUrl,
  size,
  weight,
  activity,
  description,
}: BabyTodayCardProps) => {
  return (
    <div>
      <h2>Малюк сьогодні</h2>
      <div>
        <Image src={imageUrl} alt="Малюк" width={160} height={160} />
        <div>
          <p>
            <strong>Розмір:</strong> {size}
          </p>
          <p>
            <strong>Вага:</strong> {weight}
          </p>
          <p>
            <strong>Активність:</strong> {activity}
          </p>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default BabyTodayCard;
