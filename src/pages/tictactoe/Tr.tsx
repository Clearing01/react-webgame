import Td from "./Td.tsx";
import {memo} from "react";

const Tr = memo(({ rowData, rowIndex, dispatch }: any) => {
  return (
    <tr>
      {Array(rowData.length).fill(null).map((td, i: number) => (
        <Td key={td+i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]} />
      ))}
    </tr>
  );
});

export default Tr;