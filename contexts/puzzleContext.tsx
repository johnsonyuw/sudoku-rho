"use client";
import getDefaultSudokuBoard, {
  SudokuBoard,
  getEmptyCollisions,
} from "@/utils/getSudokuBoard";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { constraintsList } from "@/utils/constraints";
import { getConstraintValidationFn } from "@/utils/constraints";

type PuzzleStateType = {
  sudoku: SudokuBoard;
  collision: boolean[][];
  constraints: typeof constraintsList;
};

const initialState: PuzzleStateType = {
  sudoku: getDefaultSudokuBoard(),
  collision: getEmptyCollisions(),
  constraints: constraintsList,
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
      newState.sudoku = getDefaultSudokuBoard();
      return newState;
    case "UPDATE_SUDOKU":
      // TODO: Optimize this
      newState.sudoku = [...state.sudoku];
      newState.sudoku[action.payload.x] = [...state.sudoku[action.payload.x]];
      newState.sudoku[action.payload.x][action.payload.y] =
        action.payload.value;
      newState.collision = validate(newState.sudoku, newState.constraints);
      return newState;
    case "TOGGLE_CONSTRAINT":
      newState.constraints = [...state.constraints];
      newState.constraints[action.payload] = { ...newState.constraints[action.payload] };
      newState.constraints[action.payload].value = !newState.constraints[action.payload].value;
      newState.collision = validate(newState.sudoku, newState.constraints);
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
