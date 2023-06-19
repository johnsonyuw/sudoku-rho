"use client";

import { Dispatch, createContext, useContext, useReducer } from "react";

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
