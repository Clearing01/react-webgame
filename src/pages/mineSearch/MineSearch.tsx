import GoMainButton from "../../components/GoMainButton.tsx";
import './MineSearch.module.css';
import React, {createContext, memo, useEffect, useMemo, useReducer} from "react";
import Table from "./Table.tsx";
import Form from "./Form.tsx";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext<{
  tableData: any[];
  halted: boolean;
  dispatch: React.Dispatch<any>;
}>({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
}

const plantMine = (row: number, cell: number, mine: number) => {
  const candidate = Array(row * cell).fill(null).map((_arr, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data: any = [];
  for (let i = 0; i < row; i++ ) {
    const rowData: any[] = [];
    data.push(rowData)
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE= 'CLICK_MINE';
export const FLAG_CELL= 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.payload.row,
          cell: action.payload.cell,
          mine: action.payload.mine,
        },
        tableData: plantMine(action.payload.row, action.payload.cell, action.payload.mine),
        halted: false,
        openedCount: 0,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked: any[] = [];
      let openedCount = 0;
      const checkAround = (row: number, cell: number) => {
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        } // 상하좌우 없는칸은 안 열기
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        } // 닫힌 칸만 열기
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        } // 한 번 연칸은 무시하기
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        if (count === 0) { // 주변칸 오픈
          const near = [];
          if (row - 1 > -1) {
            near.push([row -1, cell - 1]);
            near.push([row -1, cell]);
            near.push([row -1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          })
        }
        if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.payload.row, action.payload.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.payload.row] = [...state.tableData[action.payload.row]];
      tableData[action.payload.row][action.payload.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.payload.row] = [...state.tableData[action.payload.row]];
      if (tableData[action.payload.row][action.payload.cell] === CODE.MINE) {
        tableData[action.payload.row][action.payload.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.payload.row][action.payload.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.payload.row] = [...state.tableData[action.payload.row]];
      if (tableData[action.payload.row][action.payload.cell] === CODE.FLAG_MINE) {
        tableData[action.payload.row][action.payload.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.payload.row][action.payload.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.payload.row] = [...state.tableData[action.payload.row]];
      if (tableData[action.payload.row][action.payload.cell] === CODE.QUESTION_MINE) {
        tableData[action.payload.row][action.payload.cell] = CODE.MINE;
      } else {
        tableData[action.payload.row][action.payload.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
}

const MineSearch = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;

  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  useEffect(() => {
    let timer: any;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
      <GoMainButton />
    </TableContext.Provider>
  );
});

export default MineSearch;