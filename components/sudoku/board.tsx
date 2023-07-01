import useBoard from "@/contexts/boardContext";
import usePuzzle from "@/contexts/puzzleContext";
import getPossibleValueForIndex from "@/utils/sudokuPossibilitiesOfIndex";
import { useState } from "react";
import { range } from "underscore";

export default function SudokuBoard() {
	const { dispatch: puzzleDispatch } = usePuzzle();
	const { dispatch: boardDispatch } = useBoard();
	const { focusedCell } = useBoard().state;
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (focusedCell === null) return;
		const [x, y] = focusedCell;
		// On backspace, set value to 0, i.e. remove value from sudoku board
		if (e.key === "Backspace")
			puzzleDispatch({ type: "UPDATE_SUDOKU", payload: { x, y, value: 0 } });
		// check for arrow keys and move focused cell accordingly
		if (e.key === "ArrowUp" || e.key === "w" || e.key === "W")
			boardDispatch({ type: "MOVE_FOCUSED_CELL", payload: "UP" });
		if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
			boardDispatch({ type: "MOVE_FOCUSED_CELL", payload: "DOWN" });
		if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
			boardDispatch({ type: "MOVE_FOCUSED_CELL", payload: "LEFT" });
		if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
			boardDispatch({ type: "MOVE_FOCUSED_CELL", payload: "RIGHT" });
		// Ignore non-numeric keys
		const value = parseInt(e.key);
		if (isNaN(value)) return;
		puzzleDispatch({ type: "UPDATE_SUDOKU", payload: { x, y, value } });
	};
	return (
		<div
			className="mx-auto grid w-full content-center gap-2 py-8 sm:max-w-md sm:gap-4"
			onKeyDown={handleKeyDown}
		>
			{range(3).map((x) => (
				<div
					key={x}
					className="flex flex-col items-center justify-center gap-1"
				>
					{range(3).map((i) => (
						<div className="grid grid-cols-3 gap-2 sm:gap-4" key={`${i}${x}`}>
							{range(3).map((y) => (
								<div className="flex justify-center gap-1" key={`${i}${y}`}>
									{range(3).map((j) => (
										<SudokuCell
											key={`${i}${y}${j}`}
											idx={[x * 3 + i, y * 3 + j]}
										/>
									))}
								</div>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

function SudokuCell({ idx }: { idx: [number, number] }) {
	const { state: puzzleState } = usePuzzle();
	const value = puzzleState.sudoku[idx[0]][idx[1]];
	const colliding = puzzleState.collision[idx[0]][idx[1]];
	const { dispatch, state: { focusedCell } } = useBoard();
	const handleFocus = () => {
		dispatch({ type: "SET_FOCUSED_CELL", payload: idx });
	};
	const [possibleValues, setPossibleValues] = useState<number[]>([]);
	return (
		<div
			className="tooltip tooltip-accent"
			onMouseEnter={() => setPossibleValues(
				getPossibleValueForIndex(
					puzzleState.sudoku,
					idx,
					puzzleState.constraints.filter(e => e.value)
				)
			)}
			data-tip={
				possibleValues.length > 0
					? possibleValues.join(", ")
					: "No possible values"
			}
		>
			<button
				className={`btn-sm btn sm:btn-md ${colliding
					? "btn-error font-bold"
					: "btn-ghost bg-base-200 font-medium"
					}`}
				onFocus={handleFocus}
				// Focus on cell when focusedCell changes
				ref={el => (
					idx[0] === focusedCell?.[0]
					&& idx[1] === focusedCell?.[1]
					&& el?.focus()
				)}
			>
				<span className={value === 0 ? "invisible" : "visible"}>{value}</span>
			</button>
		</div>
	);
}