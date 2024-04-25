import Tr from "./Tr.tsx";

const Table = ({ tableData, dispatch }: any) => {
  return (
    <table>
      <tbody>
      {Array(tableData.length).fill(null).map((tr, i) => (
        <Tr key={tr+i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch}/>
      ))}
      </tbody>
    </table>
  );
};

export default Table;