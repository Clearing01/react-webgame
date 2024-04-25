import GoMainButton from "../../components/GoMainButton.tsx";
import React from "react";
import style from './ResponseCheck.module.css';

const ResponseCheck = () => {
  const [state, setState] = React.useState<string>('waiting');
  const [message, setMessage] = React.useState<string>('클릭해서 시작하세요.');
  const [result, setResult] = React.useState<number[]>([]);
  const timeout = React.useRef<number | null>(null);
  const startTime = React.useRef<number>();
  const endTime = React.useRef<number>();

  const screenState = {
    waiting: 'waiting',
    ready: 'ready',
    now: 'now'
  }

  const clickMessage = {
    waiting: '클릭해서 시작하세요.',
    ready: '초록색이 되면 클릭하세요.',
    early: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
    now: '지금 클릭'
  }

  const setScreen = (state: string, Message: string) => {
    setState(state);
    setMessage(Message);
  }

  const onClickScreen = () => {
    if (state === screenState.waiting) {
      setScreen(screenState.ready, clickMessage.ready);

      timeout.current = setTimeout(() => {
        setScreen(screenState.now, clickMessage.now);
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤

    } else if (state === screenState.ready) {
      setScreen(screenState.waiting, clickMessage.early);
      clearTimeout(timeout.current!);

    } else if (state === screenState.now) {
      setScreen(screenState.waiting, clickMessage.waiting);
      endTime.current = new Date().getTime();

      setResult((prevResult) => {
        return [...prevResult, endTime.current! - startTime.current!];
      });
    }
  }

  const onReset = () => {
    setState('waiting');
    setResult([]);
  }

  const renderAverage = () => {
    return (
      result.length === 0
        ? null
        :
        <>
          <div>평균 시간: {result.reduce((a,c) => a + c) / result.length}ms</div>
          <button onClick={onReset}>리셋</button>
        </>
    );
  }

  return (
    <>
      <div
        className={`${style.screen} ${state === 'waiting' ? style.waiting : state === 'ready' ? style.ready : style.now}`}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}

      <GoMainButton />
    </>
  );
}

export default ResponseCheck;