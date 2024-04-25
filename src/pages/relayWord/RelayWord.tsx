import React, { useState } from "react";
import GoMainButton from "../../components/GoMainButton.tsx";

const RelayWord = () => {
  const [word, setWord] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);


  const onSubmit = (e: any) => {
    e.preventDefault();
    const firstWord = word[0];

    if (value === '' || firstWord === value[value.length - 1]) {
      setValue(word);
      setResult(true);
    } else {
      setResult(false);
    }

    setWord('');
    inputRef.current?.focus();

  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

    return (
      <>
        <div>
          <p>끝말잇기</p>
          <p>{value}</p>
          <form onSubmit={onSubmit}>
            <input ref={inputRef} type="text" value={word} onChange={onChange} />
            <button type='submit'>입력</button>
          </form>
          <p>{result ? '정답' : '땡'}</p>
        </div>
        <GoMainButton />
      </>
    );
}

export default RelayWord;