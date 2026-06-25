interface IconProps {
  id: string;
  className?: string;
}

const Icon = ({ id, className }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/images/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
