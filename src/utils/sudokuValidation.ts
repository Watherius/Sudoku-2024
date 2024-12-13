import { Board, SudokuValidationProps } from '../types/sudoku'
import { getCellKey } from './boardUtils'

const checkRowConflicts = (
	board: Board,
	row: number,
	col: number,
	num: number,
	conflicts: Set<string>
): boolean => {
	for (let x = 0; x < 9; x++) {
		if (x !== col && board[row][x] === num) {
			const conflictKey = getCellKey(row, x)
			if (!conflicts.has(conflictKey)) {
				return false
			}
		}
	}
	return true
}

const checkColumnConflicts = (
	board: Board,
	row: number,
	col: number,
	num: number,
	conflicts: Set<string>
): boolean => {
	for (let x = 0; x < 9; x++) {
		if (x !== row && board[x][col] === num) {
			const conflictKey = getCellKey(x, col)
			if (!conflicts.has(conflictKey)) {
				return false
			}
		}
	}
	return true
}

const checkBoxConflicts = (
	board: Board,
	row: number,
	col: number,
	num: number,
	conflicts: Set<string>
): boolean => {
	const startRow = Math.floor(row / 3) * 3
	const startCol = Math.floor(col / 3) * 3

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const currentRow = startRow + i
			const currentCol = startCol + j
			if (
				currentRow !== row &&
				currentCol !== col &&
				board[currentRow][currentCol] === num
			) {
				const conflictKey = getCellKey(currentRow, currentCol)
				if (!conflicts.has(conflictKey)) {
					return false
				}
			}
		}
	}
	return true
}

export const isValidPlacement = ({
	board,
	row,
	col,
	num,
	conflicts = new Set(),
}: SudokuValidationProps & { conflicts?: Set<string> }): boolean => {
	if (!num) return true

	return (
		checkRowConflicts(board, row, col, num, conflicts) &&
		checkColumnConflicts(board, row, col, num, conflicts) &&
		checkBoxConflicts(board, row, col, num, conflicts)
	)
}

export const getValidPlacements = (
	board: Board,
	row: number,
	col: number,
	num: number,
	conflicts?: Set<string>
): Set<string> => {
	const validPlacements = new Set<string>()

	for (let x = 0; x < 9; x++) {
		if (conflicts?.has(getCellKey(row, x))) continue
		if (x !== col && board[row][x] === num)
			validPlacements.add(getCellKey(row, x))
	}

	for (let x = 0; x < 9; x++) {
		if (conflicts?.has(getCellKey(x, col))) continue
		if (x !== row && board[x][col] === num)
			validPlacements.add(getCellKey(x, col))
	}

	const startRow = Math.floor(row / 3) * 3
	const startCol = Math.floor(col / 3) * 3

	for (let x = startRow; x < startRow + 3; x++) {
		for (let y = startCol; y < startCol + 3; y++) {
			if (conflicts?.has(getCellKey(x, y))) continue
			if (x !== row && y !== col && board[x][y] === num)
				validPlacements.add(getCellKey(x, y))
		}
	}

	return validPlacements
}
