type GreetingBlockProps = {
  name: string;
};

const GreetingBlock = ({ name }: GreetingBlockProps) => {
  return (
    <div>
      <h1>Доброго ранку, {name}!</h1>
    </div>
  );
};

export default GreetingBlock;
