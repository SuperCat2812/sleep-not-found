import styles from "./GreetingBlock.module.css";

type GreetingBlockProps = {
  name: string;
};

const GreetingBlock = ({ name }: GreetingBlockProps) => {
  return (
    <div>
      <h1 className={styles.greeting}>Доброго ранку, {name}!</h1>
    </div>
  );
};

export default GreetingBlock;
