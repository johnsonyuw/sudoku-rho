"use client";

import { Dispatch, createContext, useContext, useReducer } from "react";
import { max, min } from "underscore";

type BoardStateType = {
  focusedCell: [number, number] | null;
};

const initialState: BoardStateType = {
  focusedCell: null,
};

type BoardActionType =
  | {
    type: "SET_FOCUSED_CELL";
    payload: [number, number];
  }
  | {
    type: "UNFOCUS_CELL";
  } | {
    type: "MOVE_FOCUSED_CELL";
    payload: "UP" | "DOWN" | "LEFT" | "RIGHT";
  };

function Board(state: BoardStateType, action: BoardActionType) {
  if (process.env.NODE_ENV === "development")
    console.log("[BOARD]", { state, action });
  const newState: BoardStateType = { ...state };
  switch (action.type) {
    case "SET_FOCUSED_CELL":
      // handle duplicate focus
      if (
        action.payload[0] === state.focusedCell?.[0] &&
        action.payload[1] === state.focusedCell?.[1]
      )
        return state;
      newState.focusedCell = action.payload;
      return newState;
    case "UNFOCUS_CELL":
      newState.focusedCell = null;
      return newState;
    case "MOVE_FOCUSED_CELL":
      if (!state.focusedCell) return state;
      const [row, col] = state.focusedCell;
      switch (action.payload) {
        case "UP":
          newState.focusedCell = [max([row - 1, 0]), col];
          break;
        case "DOWN":
          newState.focusedCell = [min([row + 1, 8]), col];
          break;
        case "LEFT":
          newState.focusedCell = [row, max([col - 1], 0)];
          break;
        case "RIGHT":
          newState.focusedCell = [row, min([col + 1, 8])];
          break;
      }
      return newState;
    default:
      return state;
  }
}

const BoardContext = createContext<{
  state: BoardStateType;
  dispatch: Dispatch<BoardActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Board, initialState);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}
