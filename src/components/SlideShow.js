import classes from "./SlideShow.module.css";
import { useState, useEffect, useRef } from "react";
import destination from "../_mocks_/destination";

//const images = [img1, img2, img3];
const delay = 5000;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === destination.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={classes.slideshow}>
      <div
        className={classes.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {destination.map((destination, index) => (
          <div className={classes.slide} key={index}>
            <img src={destination.src} className={classes.img} />
          </div>
        ))}
      </div>

      <div className={classes.slideshowDots}>
        {destination.map((_, idx) => (
          <div
            key={idx}
            className={
              index === idx ? classes.slideshowDotActive : classes.slideshowDot
            }
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
