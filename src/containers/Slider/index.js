import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((currentSlide) =>
        currentSlide === byDateDesc.length - 1 ? 0 : currentSlide + 1
      );
    }, 5000);

    return () => {
      clearTimeout(timer);

    };
  }, [byDateDesc, index]);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((focus, idx) => (
        <div
          key={focus.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={focus.cover} alt={focus.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{focus.title}</h3>
              <p>{focus.description}</p>
              <div>{getMonth(new Date(focus.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={focus.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;