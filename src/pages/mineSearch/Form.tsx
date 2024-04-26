import {memo, useCallback, useContext, useState} from "react";
import {START_GAME, TableContext} from "./MineSearch.tsx";

const Form = memo(() => {
  const [row, setRow] = useState<number>(10);
  const [cell, setCell] = useState<number>(10);
  const [mine, setMine] = useState<number>(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  }, []);
  const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCell(Number(e.target.value));
  }, []);
  const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMine(Number(e.target.value));
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, payload: { row, cell, mine }})
  }, [row, cell, mine])

  return (
    <>
      <input type="number" placeholder='세로' value={row} onChange={onChangeRow}/>
      <input type="number" placeholder='가로' value={cell} onChange={onChangeCell}/>
      <input type="number" placeholder='지뢰' value={mine} onChange={onChangeMine}/>
      <button onClick={onClickBtn}>시작</button>
    </>
  );
});

export default Form;