"use client";
import getDefaultSudokuBoard, {
  SudokuBoard,
  getEmptyCollisions,
} from "@/utils/getSudokuBoard";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { constraintsList } from "@/utils/constraints";
import { getConstraintValidationFn } from "@/utils/constraints";
import SolveBoard from "@/utils/sudokuSolvers";


type PuzzleStateType = {
  sudoku: SudokuBoard;
  collision: boolean[][];
  constraints: typeof constraintsList;
  puzzleCreatingMode: boolean;
  readOnlyCells: boolean[][];
};

const initialSudoku = getDefaultSudokuBoard();
console.log("initialSudoku", initialSudoku);
const initialState: PuzzleStateType = {
  sudoku: initialSudoku,
  collision: getEmptyCollisions(),
  constraints: constraintsList,
  puzzleCreatingMode: false,
  readOnlyCells: getReadOnlyCells(initialSudoku),
};

type PuzzleActionType =
  | {
    type: "SET_SUDOKU";
    payload: number[][];
  }
  | {
    type: "RESET_SUDOKU";
    payload: null;
  }
  | {
    type: "UPDATE_SUDOKU";
    payload: {
      x: number;
      y: number;
      value: number;
    };
  } | {
    type: "TOGGLE_CONSTRAINT";
    payload: number;
  } | {
    type: "TOGGLE_PUZZLE_CREATION_MODE";
  } | {
    type: "RESET_PUZZLE";
  } | {
    type: "SOLVE_PUZZLE";
  };

function Sudoku(state: PuzzleStateType, action: PuzzleActionType) {
  if (process.env.NODE_ENV === "development")
    console.log("[PUZZLE]", { state, action });
  const newState: PuzzleStateType = { ...state };
  switch (action.type) {
    case "SET_SUDOKU":
      newState.sudoku = action.payload;
      return newState;
    case "RESET_SUDOKU":
      console.log("RESET_SUDOKU");
      newState.sudoku = getDefaultSudokuBoard();
      return newState;
    case "UPDATE_SUDOKU":
      // TODO: Optimize this
      if (!state.puzzleCreatingMode && state.readOnlyCells[action.payload.x][action.payload.y]) return state;
      newState.sudoku = [...state.sudoku];
      newState.sudoku[action.payload.x] = [...state.sudoku[action.payload.x]];
      newState.sudoku[action.payload.x][action.payload.y] =
        action.payload.value;
      newState.collision = validate(newState.sudoku, newState.constraints);
      if (state.puzzleCreatingMode) {
        newState.readOnlyCells = getReadOnlyCells(newState.sudoku);
      }
      return newState;
    case "TOGGLE_CONSTRAINT":
      newState.constraints = [...state.constraints];
      newState.constraints[action.payload] = { ...newState.constraints[action.payload] };
      newState.constraints[action.payload].value = !newState.constraints[action.payload].value;
      newState.collision = validate(newState.sudoku, newState.constraints);
      return newState;
    case "TOGGLE_PUZZLE_CREATION_MODE":
      newState.puzzleCreatingMode = !newState.puzzleCreatingMode;
      return newState;
    case "RESET_PUZZLE":
      // Removing all the non-readonly cells from the board
      newState.sudoku = state.sudoku.map(
        (row, i) => row.map(
          (col, j) => (
            state.readOnlyCells[i][j] ? col : 0
          )
        )
      );
      newState.collision = validate(newState.sudoku, newState.constraints);
      return newState;
    case "SOLVE_PUZZLE":
      newState.sudoku = SolveBoard(state.sudoku, state.constraints) || state.sudoku;
      return newState;
    default:
      return state;
  }
}

const PuzzleContext = createContext<{
  state: PuzzleStateType;
  dispatch: Dispatch<PuzzleActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const PuzzleProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Sudoku, initialState);
  return (
    <PuzzleContext.Provider value={{ state, dispatch }}>
      {children}
    </PuzzleContext.Provider>
  );
};

export default function usePuzzle() {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error("useSudoku must be used within a SudokuProvider");
  }
  return context;
}

function validate(grid: number[][], constraints: typeof constraintsList) {
  let invalidIndices: [number, number][] = [];
  for (let constraint of constraints) {
    if (!constraint.value) continue;
    let validationFn = getConstraintValidationFn(constraint.name);
    let result = validationFn(grid);
    if (result !== true && Array.isArray(result)) {
      invalidIndices.push(...result);
    }
  }
  let newCollision = getEmptyCollisions();
  for (let [x, y] of invalidIndices) {
    newCollision[x][y] = true;
  }
  return newCollision;
}

function getReadOnlyCells(board: number[][]) {
  return board.map((row) => row.map((cell) => cell !== 0));
}