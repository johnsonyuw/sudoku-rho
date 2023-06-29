import { constraintsList } from "./constraints";
import { validatateByConstraintsForIndex } from "./sudokuGuessValidation";

export default function SolveBoard(board: number[][], constraints: typeof constraintsList) {
	// filter out constraints that are not applied
	const constraintsToApply = constraints.filter(e => e.value);
	// cloning the board
	const boardClone = board.map(e => e.slice());
	// solving the board
	if (solve(boardClone, constraintsToApply)) return boardClone;
	return false;
}

function solve(board: number[][],
	constraints: typeof constraintsList,
	start: [number, number] = [0, 0]
) {
	const [row, col] = start;
	if (row === 9) return true;
	if (board[row][col] !== 0) return solve(board, constraints, nextIndex(start));
	for (let i = 1; i <= 9; i++) {
		if (validatateByConstraintsForIndex(board, start, i, constraints)) {
			board[row][col] = i;
			if (solve(board, constraints, nextIndex(start))) return true;
		}
	}
	board[row][col] = 0;
	return false;
}

function nextIndex([row, col]: [number, number]): [number, number] {
	if (col === 8) return [row + 1, 0];
	return [row, col + 1];
}