"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = {
	theme: "bumblebee"
};

type ThemeActionType = {
	type: "SET_THEME";
	payload: "bumblebee" | "dracula";
};

function Theme(state: typeof initialState, action: ThemeActionType) {
	if (process.env.NODE_ENV === "development") {
		console.log("[THEME]", { state, action });
	}
	switch (action.type) {
		case "SET_THEME":
			return { ...state, theme: action.payload };
		default:
			return state;
	}
}

const ThemeContext = createContext<{
	state: typeof initialState;
	dispatch: (action: ThemeActionType) => void;
}>({
	state: initialState,
	dispatch: (action: ThemeActionType) => { }
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(Theme, initialState);
	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}