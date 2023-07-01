import { constraintsList } from "./constraints";
import { validatateByConstraintsForIndex } from "./sudokuGuessValidation";

export default function getPossibleValueForIndex(grid: number[][], index: [number, number], constraints: typeof constraintsList) {
	const possibleValues: number[] = [];
	for (let i = 1; i <= 9; i++) {
		if (validatateByConstraintsForIndex(grid, index, i, constraints)) possibleValues.push(i);
	}
	return possibleValues;
}