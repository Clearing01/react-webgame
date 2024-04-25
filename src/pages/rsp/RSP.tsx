import GoMainButton from "../../components/GoMainButton.tsx";
import style from './RSP.module.css';
import {useMemo, useState} from "react";
import {useInterval} from "../../hooks/utils.tsx";

const RSP = () => {
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [imgCoord, setImgCoord] = useState<string>('0');
  const [isRunning, setIsRunning] = useState<boolean>(true);

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

  const onClickBtn = (choice: string) => () => {
    if (!isRunning) return;
    setIntervalRun(false);

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

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  }

  const setIntervalRun = (flag: boolean) => {
    setIsRunning(flag);
  }
  
  useInterval(changeHand, isRunning ? 100 : null);

  return (
    <>
      <div
        className={style.computer}
        style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      />
      <div>
        <button className={style.btn} onClick={onClickBtn('rock')}>바위</button>
        <button className={style.btn} onClick={onClickBtn('scissors')}>가위</button>
        <button className={style.btn} onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>score: {score}점</div>

      <button onClick={() => setIntervalRun(true)}>다시</button>

      <GoMainButton />
    </>
  );
}

export default RSP;