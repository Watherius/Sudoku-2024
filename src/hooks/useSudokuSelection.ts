import { useCallback, useState } from 'react'
import { Board, CellPosition, SelectedNumber } from '../types/sudoku'
import { getCellKey } from '../utils/boardUtils'

interface SudokuSelection {
	selectedCell: CellPosition | null
	setSelectedCell: (cell: CellPosition | null) => void
	selectedNumber: SelectedNumber
	setSelectedNumber: (number: SelectedNumber) => void
}

export function useSudokuSelection(
	board: Board,
	conflicts: Set<string>
): SudokuSelection {
	const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null)
	const [selectedNumber, setSelectedNumber] = useState<SelectedNumber>(null)

	const handleCellSelect = useCallback(
		(cell: CellPosition | null) => {
			if (!cell) {
				setSelectedCell(null)
				setSelectedNumber(null)
				return
			}

			const [row, col] = cell
			const cellKey = getCellKey(row, col)
			const value = board[row][col]

			if (value !== 0 && !conflicts.has(cellKey)) {
				setSelectedCell(cell)
				setSelectedNumber(value)
			} else {
				setSelectedCell(cell)
			}
		},
		[board]
	)

	const handleNumberSelect = useCallback(
		(number: SelectedNumber) => {
			if (number === selectedNumber) {
				setSelectedNumber(null)
				setSelectedCell(null)
				return
			}

			setSelectedNumber(number)

			if (number !== null) {
				for (let row = 0; row < board.length; row++) {
					for (let col = 0; col < board[row].length; col++) {
						const cellKey = getCellKey(row, col)
						if (board[row][col] === number && !conflicts?.has(cellKey)) {
							setSelectedCell([row, col])
							return
						}
					}
				}
			} else {
				setSelectedCell(null)
			}
		},
		[board, selectedNumber]
	)

	return {
		selectedCell,
		setSelectedCell: handleCellSelect,
		selectedNumber,
		setSelectedNumber: handleNumberSelect,
	}
}
