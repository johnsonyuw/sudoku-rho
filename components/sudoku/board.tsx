import useBoard from "@/contexts/boardContext";
import usePuzzle from "@/contexts/puzzleContext";
import { range } from "underscore";

export default function SudokuBoard() {
	const { dispatch } = usePuzzle();
	const { focusedCell } = useBoard().state;
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (focusedCell === null) return;
		const [x, y] = focusedCell;
		if (e.key === "Backspace")
			dispatch({ type: "UPDATE_SUDOKU", payload: { x, y, value: 0 } });
		const value = parseInt(e.key);
		if (isNaN(value)) return;
		dispatch({ type: "UPDATE_SUDOKU", payload: { x, y, value } });
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
	const value = usePuzzle().state.sudoku[idx[0]][idx[1]];
	const colliding = usePuzzle().state.collision[idx[0]][idx[1]];
	const { dispatch } = useBoard();
	const handleFocus = () => {
		dispatch({ type: "SET_FOCUSED_CELL", payload: idx });
	};
	return (
		<>
			<button
				className={`btn-sm btn sm:btn-md ${colliding
					? "btn-error font-bold"
					: "btn-ghost bg-base-200 font-medium"
					}`}
				// onClick={handleFocus}
				onFocus={handleFocus}
			>
				<span className={value === 0 ? "invisible" : "visible"}>{value}</span>
			</button>
		</>
	);
}