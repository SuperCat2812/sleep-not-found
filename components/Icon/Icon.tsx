interface IconProps {
  id: string;
  className?: string;
}

const Icon = ({ id, className }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 32 32">
      <use href={`/images/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
