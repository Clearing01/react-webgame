import Tr from "./Tr.tsx";
import {TableContext} from "./MineSearch.tsx";
import {memo, useContext} from "react";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length).fill(null).map((tr, i) => (
          <Tr key={tr+i} rowIndex={i} />
        ))}
      </tbody>
    </table>
  );
});

export default Table;