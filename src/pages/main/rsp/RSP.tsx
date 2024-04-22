import GoMainButton from "../../../components/GoMainButton.tsx";
import style from './RSP.module.css';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const RSP = () => {
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [imgCoord, setImgCoord] = useState<string>('0');
  const interval = useRef<number | undefined>();

  const rspScore: Record<string, number> = useMemo(() => ({
    scissors: 1,
    rock: 0,
    paper: -1,
  }), []);

  const resultMessage: Record<string, string> = useMemo(() => ({
    win: '이겼습니다!',
    same: '비겼습니다.',
    lose: '졌습니다!',
  }), []);

  const rspCoords: Record<string, string> = useMemo(() => ({
    rock: '0',
    scissors: '-142px',
    paper: '-284px',
  }), []);

  const computerChoice = (imgCoord: string) => {
    return Object.keys(rspCoords).find(key => rspCoords[key] === imgCoord)!;
  };

  const onClickBtn = (choice: string) => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = undefined;

    const myScore = rspScore[choice];
    const cpuScore = rspScore[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult(resultMessage.same);
    } else if ([-1, 2].includes(diff)) {
      setResult(resultMessage.win);
      setScore((prevScore: number) => prevScore + 1);
    } else {
      setResult(resultMessage.lose);
      setScore((prevScore: number) => prevScore - 1);
    }
  }
  
  const makeInterval = useCallback(() => {
    interval.current = setInterval(() => {
      if (imgCoord === rspCoords.rock) {
        setImgCoord(rspCoords.scissors);
      } else if (imgCoord === rspCoords.scissors) {
        setImgCoord(rspCoords.paper);
      } else if (imgCoord === rspCoords.paper) {
        setImgCoord(rspCoords.rock);
      }
    }, 100);
  }, [imgCoord, rspCoords]);

  useEffect(() => {
    makeInterval();

    return () => {
      clearInterval(interval.current);
    }
  }, [imgCoord, rspCoords, makeInterval]);

  return (
    <>
      <div
        className={style.computer}
        style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      />
      <div>
        <button className={style.btn} onClick={() => onClickBtn('rock')}>바위</button>
        <button className={style.btn} onClick={() => onClickBtn('scissors')}>가위</button>
        <button className={style.btn} onClick={() => onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>score: {score}점</div>

      <button onClick={makeInterval}>다시</button>

      <GoMainButton />
    </>
  );
}

export default RSP;