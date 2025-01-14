import { Board, CellPosition, CellState } from '../types/sudoku'
import { getCellKey, getSameBox } from './boardUtils'
import { getValidPlacements } from './sudokuValidation'

export const getCellState = (
	board: Board,
	position: CellPosition,
	selectedCell: CellPosition | null,
	selectedNumber: number | null,
	conflicts: Set<string>
): CellState => {
	const [rowIndex, colIndex] = position
	const cellKey = getCellKey(rowIndex, colIndex)
	const cell = board[rowIndex][colIndex]
	const hasConflict = conflicts.has(cellKey)
	const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex

	const isSameNumber = Boolean(
		!hasConflict &&
			cell !== 0 &&
			selectedCell &&
			!conflicts.has(getCellKey(selectedCell[0], selectedCell[1])) &&
			((selectedNumber !== null && cell === selectedNumber) ||
				(selectedCell && board[selectedCell[0]][selectedCell[1]] === cell))
	)

	const validPlacements =
		selectedCell &&
		conflicts.has(getCellKey(selectedCell[0], selectedCell[1])) &&
		selectedCell[0] >= 0 &&
		selectedCell[0] < board.length &&
		selectedCell[1] >= 0 &&
		selectedCell[1] < board[selectedCell[0]].length &&
		board[selectedCell[0]][selectedCell[1]] !== 0
			? getValidPlacements(board, selectedCell[0], selectedCell[1], board[selectedCell[0]][selectedCell[1]], conflicts)
			: new Set<string>()

	return {
		isSelected,
		hasConflict,
		isSameNumber,
		showValidPlacement: validPlacements.has(cellKey),
		isHighlighted: Boolean(selectedCell && (selectedCell[0] === rowIndex || selectedCell[1] === colIndex)),
		isInSameBox: Boolean(selectedCell && getSameBox(position, selectedCell)),
	}
}
