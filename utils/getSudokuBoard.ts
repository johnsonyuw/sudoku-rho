const getSudokuEmptyBoard = () =>
	Array(9)
		.fill(null)
		.map(() => Array(9).fill(0));

export default getSudokuEmptyBoard;