type MomTipCardProps = {
  tip: string;
};

const MomTipCard = ({ tip }: MomTipCardProps) => {
  return (
    <div>
      <h2>Порада для мами</h2>
      <p>{tip}</p>
    </div>
  );
};

export default MomTipCard;
