import css from "./WeekSelector.module.css";

function WeekSelector() {
  const weeks = [];
  for (let i = 1; i <= 42; i++) {
    weeks.push(i);
  }

  return (
    <ul className={css.list}>
      {weeks.map((week) => {
        return (
          <li className={css.item} key={week}>
            <p className={css.day}>{week}</p>
            <p className={css.week}>Тиждень</p>
          </li>
        );
      })}
    </ul>
  );
}

export default WeekSelector;
