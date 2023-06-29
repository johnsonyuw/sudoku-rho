import { chunk, times } from "underscore";

const getDefaultSudokuBoard = () => {
	return chunk(
		// "900000073720080000000400000002003000000000000001000690009700060360009100000045002"
		"500913720300080509090250080680470230009500460704000005020000000400891600850720003"
			.split("")
			.map((e) => parseInt(e)),
		9
	);
};

/**
 * Returns a 9x9 array of type filled with value
 * @param value Value to be filled in the board
 * @returns 9x9 array of type filled with value
 * 
 * eg: getBoardFilled<number>(0) should return a 9x9 array of 0s.
 * 
 * eg: getBoardFilled<boolean>(false) should return a 9x9 array of falses.
 */
const getBoardFilled = <T>(value: T): T[][] => {
	return times(9, () => times(9, () => value));
};

const getEmptySudokuBoard = () => getBoardFilled(0);
const getEmptyCollisions = () => getBoardFilled(false);


type SudokuBoard = number[][];

// default export getDefaultSudokuBoard and export getSudokuEmptyBoard
export default getDefaultSudokuBoard;
export { getEmptySudokuBoard, getEmptyCollisions, getBoardFilled };
export type { SudokuBoard };
