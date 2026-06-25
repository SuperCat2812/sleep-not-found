type StatusBlockProps = {
  week: number;
  daysLeft: number;
};

const StatusBlock = ({ week, daysLeft }: StatusBlockProps) => {
  return (
    <div>
      <div>
        <p>Тиждень</p>
        <span>{week}</span>
      </div>
      <div>
        <p>Днів до зустрічі</p>
        <span>~{daysLeft}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
