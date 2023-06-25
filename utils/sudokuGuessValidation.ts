export function validValueByRowForIndex(grid: number[][], index: [number, number], value: number): boolean {
	return grid[index[0]].includes(value);
}

export function validValueByColumnForIndex(grid: number[][], index: [number, number], value: number): boolean {
	for (let i = 0; i < 9; i++) if (grid[i][index[1]] === value) return false;
	return true;
}

export function validValueByBoxForIndex(grid: number[][], index: [number, number], value: number): boolean {
	const boxRow = Math.floor(index[0] / 3) * 3;
	const boxColumn = Math.floor(index[1] / 3) * 3;
	for (let i = boxRow; i < boxRow + 3; i++) {
		for (let j = boxColumn; j < boxColumn + 3; j++) {
			if (grid[i][j] === value) return false;
		}
	}
	return true;
}

export function validValueForDiagonalByIndex(grid: number[][], index: [number, number], value: number): boolean {
	if (index[0] === index[1]) {
		for (let i = 0; i < 9; i++) if (grid[i][i] === value) return false;
	} else if (index[0] + index[1] === 8) {
		for (let i = 0; i < 9; i++) if (grid[i][8 - i] === value) return false;
	}
	return true;
}