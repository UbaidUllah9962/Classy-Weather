import Utilities from "../../utilities";

const Day = (props) => {
  const { date, max, min, code, isToday } = props;

  return (
    <li className="day">
      <span>{Utilities.getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : Utilities.formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
};

export default Day;
