import GoMainButton from "../../components/GoMainButton.tsx";
import {useState} from "react";

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
  const [target, setTarget] = useState(getFourDigits());
  const [guess, setGuess] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [tries, setTries] = useState<string[]>([]);

  const handleChange = (e:any) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(guess.length !== 4 || tries.includes(guess)) {
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

    setTries([...tries, guess]);
    setResult(`스트라이크: ${strike}, 볼: ${ball}`);

    if (strike === 4) {
      setTarget(getFourDigits());
      setTries([]);
      setResult('축하합니다! 정답입니다!');
    }

    setGuess('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={handleChange} maxLength={4} />
        <button type="submit">제출</button>
      </form>
      <p>{result}</p>
      <div>
        시도: {tries.map((t, i) => (
          <div key={t}>{i + 1}. {t}</div>
        ))}
      </div>
      <GoMainButton />
    </div>
  );
}

export default NumberBaseball;