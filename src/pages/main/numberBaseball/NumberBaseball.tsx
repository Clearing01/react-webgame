import GoMainButton from "../../../components/GoMainButton.tsx";
import React, {useState} from "react";
import Try from "./Try.tsx";


interface TryInfo {
  try: string;
  result: string;
}

const getFourDigits = () => {
  const digits:number[] = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
};

const NumberBaseball = () => {
  const [target, setTarget] = useState(getFourDigits);
  const [guess, setGuess] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e:any) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(guess.length !== 4 || tries.find((v) => v.try === guess)) {
      setGuess('');
      return;
    }

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === target[i]) {
        strike++;
      } else if (target.includes(guess[i])) {
        ball++;
      }
    }

    setTries([...tries, { try: guess, result: `스트라이크: ${strike}, 볼: ${ball}`}]);
    setResult('');

    if (strike === 4) {
      setTarget(getFourDigits());
      setTries([]);
      setResult('축하합니다! 정답입니다!');
    }

    setGuess('');
    inputRef.current?.focus();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" value={guess} onChange={handleChange} maxLength={4} />
          <button type="submit">제출</button>
        </form>
        <p>{result}</p>
        <div> 시도: {tries.length} </div>
        <ul>
          {tries.map((t: TryInfo) => (
            <div key={t.try}>
              <Try tryInfo={t} />
            </div>
          ))}
        </ul>
      </div>
      <GoMainButton />
    </>
  );
}

export default NumberBaseball;