import Td from "./Td.tsx";
import {TableContext} from "./MineSearch.tsx";
import {memo, useContext} from "react";

const Tr = memo(({ rowIndex }: any) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[0] && Array(tableData.length).fill(null).map((td, i) => (
        <Td key={td+i} rowIndex={rowIndex} cellIndex={i}/>
      ))}
    </tr>
  );
});

export default Tr;