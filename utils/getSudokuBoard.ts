// const getSudokuEmptyBoard = () =>
// 	Array(9)
// 		.fill(null)
// 		.map(() => Array(9).fill(0));

import { chunk } from "underscore";

const getSudokuEmptyBoard = () => {
	return chunk(
		"900000073720080000000400000002003000000000000001000690009700060360009100000045002"
			.split("")
			.map((e) => parseInt(e)),
		9
	);
};

export default getSudokuEmptyBoard;
