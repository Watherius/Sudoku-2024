import { Dispatch, SetStateAction } from 'react'
import { CellPosition, GameState } from '../../types/sudoku'
import { cloneBoard, getCellKey } from '../../utils/boardUtils'
import { getCellState } from '../../utils/cellStateUtils'
import SudokuCell from './SudokuCell'

interface SudokuBoardProps {
	gameState: GameState
	setGameState: Dispatch<SetStateAction<GameState>>
	selectedCell: CellPosition | null
	setSelectedCell: (cell: CellPosition | null) => void
	selectedNumber: number | null
	conflicts: Set<string>
	setConflicts: Dispatch<SetStateAction<Set<string>>>
	newValues: Set<string>
	setNewValues: Dispatch<SetStateAction<Set<string>>>
	statusNote: boolean
}

export default function SudokuBoard({
	gameState,
	setGameState,
	selectedCell,
	setSelectedCell,
	selectedNumber,
	conflicts,
	setConflicts,
	newValues,
	setNewValues,
	statusNote,
}: SudokuBoardProps) {
	const handleCellClick = (rowIndex: number, colIndex: number) => {
		const position: CellPosition = [rowIndex, colIndex]
		const cellKey = getCellKey(rowIndex, colIndex)
		const cellValue = gameState.playingBoard[rowIndex][colIndex]

		if (cellValue !== 0 && !conflicts.has(cellKey)) {
			setSelectedCell(position)
			return
		}

		setSelectedCell(position)

		if (selectedNumber !== null && !statusNote) {
			const newBoard = cloneBoard(gameState.playingBoard)
			newBoard[rowIndex][colIndex] = selectedNumber

			const isCorrectValue =
				gameState.solutionBoard[rowIndex][colIndex] === selectedNumber

			setConflicts(prev => {
				const next = new Set(prev)
				if (!isCorrectValue) {
					next.add(cellKey)
				} else {
					next.delete(cellKey)
				}
				return next
			})

			if (cellValue === 0) {
				setNewValues(prev => {
					const next = new Set(prev)
					next.add(cellKey)
					return next
				})
			}

			setGameState(prev => ({
				...prev,
				playingBoard: newBoard,
			}))
		}
	}

	return (
		<div className='grid grid-cols-9 border-2 border-black'>
			{gameState.playingBoard.map((row, rowIndex) =>
				row.map((cell, colIndex) => {
					const position: CellPosition = [rowIndex, colIndex]
					const cellKey = getCellKey(rowIndex, colIndex)

					const cellState = getCellState(
						gameState.playingBoard,
						position,
						selectedCell,
						selectedNumber,
						conflicts
					)

					return (
						<div
							key={cellKey}
							className={`
                ${
									colIndex % 3 === 2 && colIndex !== 8
										? 'border-r-2 border-black'
										: ''
								}
                ${
									rowIndex % 3 === 2 && rowIndex !== 8
										? 'border-b-2 border-black'
										: ''
								}
              `}
						>
							<SudokuCell
								value={cell || ''}
								{...cellState}
								isNewValue={newValues.has(cellKey)}
								statusNote={statusNote}
								selectedNumber={selectedNumber}
								onClick={() => handleCellClick(rowIndex, colIndex)}
							/>
						</div>
					)
				})
			)}
		</div>
	)
}
