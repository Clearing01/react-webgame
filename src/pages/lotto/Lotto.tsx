import GoMainButton from "../../components/GoMainButton.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import Ball from "./Ball.tsx";

const getWinNumbers = () => {
  console.log('getWinNumbers');

  const candidate = Array(45).fill(null).map((_v: number, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumber = shuffle.splice(0, 6).sort((a, b) => a - b);
  return [...winNumber, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState<number[]>(getWinNumbers);
  const [winBalls, setWinBalls] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState<boolean>(false);
  const timeout = useRef<number[]>([]);


  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeout.current = [];
  }, []);

  const runTimeouts = useCallback(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeout.current[i] = setTimeout(() => {
        setWinBalls((prevBalls: number[]) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeout.current[winNumbers.length - 1] = setTimeout(() => {
      setBonus(winNumbers[winNumbers.length - 1]);
      setRedo(true);
    }, 7000);
  }, [winNumbers]);

  useEffect(() => {
    const timeoutCurrent = timeout.current;
    runTimeouts();

    return () => {
      timeoutCurrent.forEach((v) => clearTimeout(v));
    }
  }, [runTimeouts]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus}/>}
      {redo && <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>}

      <GoMainButton />
    </>
  );
}

export default Lotto;