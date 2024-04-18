import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Gugudan = () => {
  const navigate = useNavigate();
  const [firstNumber, setFirstNumber] = useState<number>(Math.floor(Math.random() * 9) + 1);
  const [secondNumber, setSecondNumber] = useState<number>(Math.floor(Math.random() * 9) + 1);
  const [answer, setAnswer] = useState<string>('');
  const [correct, setCorrect] = useState<boolean>(true);
  const inputRef = React.createRef<HTMLInputElement>();
  const prevAnswerRef = useRef<string>('');

  const onChange = (e: any) => {
    setAnswer(e.target.value);
  }

  const submitAnswer = (e: any) => {
    e.preventDefault();
    const result = firstNumber * secondNumber;

    if (Number(answer) === result) {
      setFirstNumber(Math.floor(Math.random() * 9) + 1);
      setSecondNumber(Math.floor(Math.random() * 9) + 1);
      prevAnswerRef.current = answer;
    }

    setCorrect(Number(answer) === result);
    setAnswer('');
    inputRef.current?.focus();
  }

  const goMain = () => navigate('/');

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <p>구구단</p>
        <p>{firstNumber} * {secondNumber} = ?</p>
        <form onSubmit={submitAnswer}>
          <input ref={inputRef} type='number' value={answer} onChange={onChange}/>
          <button type='submit'>입력</button>
        </form>
        <p>{correct ? `정답: ${prevAnswerRef.current}` : '땡'}</p>
      </div>

      <button onClick={goMain}>
        메인으로 이동
      </button>
    </>
  );
};
export default Gugudan;
