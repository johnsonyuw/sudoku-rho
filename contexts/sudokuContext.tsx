"use client";
import getDefaultSudokuBoard from "@/utils/getSudokuBoard";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

type SudokuStateType = {
  sudoku: number[][];
};

const initialState: SudokuStateType = {
  sudoku: getDefaultSudokuBoard(),
};

type SudokuActionType =
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
        row: number;
        col: number;
        value: number;
      };
    };

function Sudoku(state: SudokuStateType, action: SudokuActionType) {
  if (process.env.NODE_ENV === "development")
    console.log("[SUDOKU]", { state, action });
  const newState: SudokuStateType = { ...state };
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
      newState.sudoku[action.payload.row] = [
        ...state.sudoku[action.payload.row],
      ];
      newState.sudoku[action.payload.row][action.payload.col] =
        action.payload.value;
      return newState;
    default:
      return state;
  }
}

const SudokuContext = createContext<{
  state: SudokuStateType;
  dispatch: Dispatch<SudokuActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const SudokuProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Sudoku, initialState);
  return (
    <SudokuContext.Provider value={{ state, dispatch }}>
      {children}
    </SudokuContext.Provider>
  );
};

export default function useSudoku() {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error("useSudoku must be used within a SudokuProvider");
  }
  return context;
}
