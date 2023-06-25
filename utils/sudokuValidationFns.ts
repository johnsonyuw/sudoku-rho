export function RowValidationOfIndex(
  grid: number[][],
  row: number,
  col: number,
  value = grid[row][col]
): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value && i !== col) {
      invalidIndices.push([row, i]);
    }
  }
  return invalidIndices.length === 0 ? true : invalidIndices;
}

export function ColValidationOfIndex(
  grid: number[][],
  row: number,
  col: number,
  value = grid[row][col]
): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === value && i !== row) {
      invalidIndices.push([i, col]);
    }
  }
  return invalidIndices.length === 0 ? true : invalidIndices;
}

export function BoxValidationOfIndex(
  grid: number[][],
  row: number,
  col: number,
  value = grid[row][col]
): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (grid[i][j] === value && i !== row && j !== col) {
        invalidIndices.push([i, j]);
      }
    }
  }
  return invalidIndices.length === 0 ? true : invalidIndices;
}

export function DiagonalValidationOfIndex(
  grid: number[][],
  row: number,
  col: number,
  value = grid[row][col]
): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  if (row === col) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][i] === value && i !== row) {
        invalidIndices.push([i, i]);
      }
      if (grid[i][8 - i] === value && i !== row) {
        invalidIndices.push([i, 8 - i]);
      }
    }
  }
  return invalidIndices.length === 0 ? true : invalidIndices;
}

export function RowsValidation(grid: number[][]): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  for (let row = 0; row < 9; row++) {
    let numOfOccurance = Array(10).fill(0);
    for (let x of grid[row]) numOfOccurance[x]++;
    for (let col = 0; col < 9; col++)
      if (grid[row][col] !== 0 && numOfOccurance[grid[row][col]] > 1)
        invalidIndices.push([row, col]);
  }
  if (invalidIndices.length === 0) return true;
  return invalidIndices;
}

export function ColsValidation(grid: number[][]): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  for (let col = 0; col < 9; col++) {
    let numOfOccurance = Array(10).fill(0);
    for (let row = 0; row < 9; row++) numOfOccurance[grid[row][col]]++;
    for (let row = 0; row < 9; row++)
      if (grid[row][col] !== 0 && numOfOccurance[grid[row][col]] > 1)
        invalidIndices.push([row, col]);
  }
  if (invalidIndices.length === 0) return true;
  return invalidIndices;
}

export function BoxesValidation(
  grid: number[][]
): boolean | [number, number][] {
  let invalidIndices: [number, number][] = [];
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      let numOfOccurance = Array(10).fill(0);
      for (let row = boxRow; row < boxRow + 3; row++) {
        for (let col = boxCol; col < boxCol + 3; col++) {
          numOfOccurance[grid[row][col]]++;
        }
      }
      for (let row = boxRow; row < boxRow + 3; row++) {
        for (let col = boxCol; col < boxCol + 3; col++) {
          if (grid[row][col] !== 0 && numOfOccurance[grid[row][col]] > 1)
            invalidIndices.push([row, col]);
        }
      }
    }
  }
  if (invalidIndices.length === 0) return true;
  return invalidIndices;
}

export function DiagonalsValidation(grid: number[][]) {
  let invalidIndices: [number, number][] = [];
  let numOfOccuranceMainDiagonal = Array(10).fill(0);
  let numOfOccuranceOtherDiagonal = Array(10).fill(0);
  for (let i = 0; i < 9; i++) {
    numOfOccuranceMainDiagonal[grid[i][i]]++;
    numOfOccuranceOtherDiagonal[grid[i][8 - i]]++;
  }
  for (let i = 0; i < 9; i++) {
    if (grid[i][i] !== 0 && numOfOccuranceMainDiagonal[grid[i][i]] > 1)
      invalidIndices.push([i, i]);
    if (grid[i][8 - i] !== 0 && numOfOccuranceOtherDiagonal[grid[i][8 - i]] > 1)
      invalidIndices.push([i, 8 - i]);
  }
  if (invalidIndices.length === 0) return true;
  return invalidIndices;
}

// DEPRECATED
// Validation function for a given index
// issue: It doesn't remove old collision indices
/*
function validate(
	grid: number[][],
	row: number,
	col: number,
	constraints: typeof constraintsList,
	collision: boolean[][]
) {
	let invalidIndices: [number, number][] = [];
	for (let constraint of constraints) {
		if (!constraint.value) continue;
		let validationFn = getConstraintValidationFn(constraint.name);
		let result = validationFn(grid, row, col, grid[row][col]);
		if (result !== true && Array.isArray(result)) {
			invalidIndices.push(...result);
		}
	}
	if (invalidIndices.length === 0) return;
	invalidIndices.push([row, col]);
	for (let [x, y] of invalidIndices) {
		collision[x][y] = true;
	}
}
*/
