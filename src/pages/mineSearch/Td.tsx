import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "./MineSearch.tsx";
import {memo, useCallback, useContext, useMemo} from "react";

const getTdStyle = (code: any) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
}

const getTdText = (code: any) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
}

const Td = memo(({ rowIndex, cellIndex }: any) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, payload: { row: rowIndex, cell: cellIndex }});
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, payload: { row: rowIndex, cell: cellIndex }});
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, payload: { row: rowIndex, cell: cellIndex }});
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, payload: { row: rowIndex, cell: cellIndex }});
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, payload: { row: rowIndex, cell: cellIndex }});
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  return useMemo(() =>(
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      { getTdText(tableData[rowIndex][cellIndex]) }
    </td>
  ), [tableData[rowIndex][cellIndex]]);
});

export default Td;