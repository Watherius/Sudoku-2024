import { Board, CellPosition } from '../types/sudoku'

export const createEmptyBoard = (): Board =>
	Array(9)
		.fill(null)
		.map(() => Array(9).fill(null))

export const cloneBoard = (board: Board): Board => board.map(row => [...row])

export const getSameBox = (pos1: CellPosition, pos2: CellPosition): boolean => {
	const [row1, col1] = pos1
	const [row2, col2] = pos2
	const boxRow1 = Math.floor(row1 / 3)
	const boxCol1 = Math.floor(col1 / 3)
	const boxRow2 = Math.floor(row2 / 3)
	const boxCol2 = Math.floor(col2 / 3)
	return boxRow1 === boxRow2 && boxCol1 === boxCol2
}

export const getCellKey = (row: number, col: number): string => `${row},${col}`
