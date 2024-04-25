import style from "./Lotto.module.css";
import React, {memo} from "react";

interface BallProps {
  number: number;
}

const Ball: React.FC<BallProps> = memo(({ number }) => {
  let background: any;
  if (number <= 10) {
    background = { backgroundColor: "red" };
  } else if (number <= 20) {
    background = { backgroundColor: "orange" };
  } else if (number <= 30) {
    background = { backgroundColor: "yellow" };
  } else if (number <= 40) {
    background = { backgroundColor: "lightblue" };
  } else {
    background = { backgroundColor: "green" };
  }

  return <div className={style.ball} style={ background }>{number}</div>;
});

export default Ball;