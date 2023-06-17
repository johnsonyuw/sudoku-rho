import { chunk, times } from "underscore";

const getDefaultSudokuBoard = () => {
	return chunk(
		"900000073720080000000400000002003000000000000001000690009700060360009100000045002"
			.split("")
			.map((e) => parseInt(e)),
		9
	);
};

const getEmptySudokuBoard = () => times(9, () => times(9, () => 0));

// default export getDefaultSudokuBoard and export getSudokuEmptyBoard
export default getDefaultSudokuBoard;
export { getEmptySudokuBoard };