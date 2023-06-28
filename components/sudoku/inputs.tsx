import useBoard from "@/contexts/boardContext";
import usePuzzle from "@/contexts/puzzleContext";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function SudokuInputs() {
	return (
		<div className="join w-full flex-wrap justify-center gap-1 py-4">
			{Array(10)
				.fill(0)
				.map((_, value) => (
					<InputButton key={value} value={value} />
				))}
		</div>
	);
}

function InputButton({ value }: { value: number }) {
	const { focusedCell } = useBoard().state;
	const { dispatch } = usePuzzle();
	const handleClick = () => {
		if (focusedCell === null) return;
		const [x, y] = focusedCell;
		dispatch({ type: "UPDATE_SUDOKU", payload: { x, y, value } });
	};
	return (
		<button
			className="btn-ghost btn-sm join-item btn bg-base-200 sm:btn-md"
			onClick={handleClick}
		>
			{value === 0 ? <TrashIcon className="h-4 w-4" /> : value}
		</button>
	);
}