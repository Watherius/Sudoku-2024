import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { CellPosition, GameState } from '../../../types/sudoku'
import { cloneBoard, getCellKey } from '../../../utils/boardUtils'
import { getCellState } from '../../../utils/cellStateUtils'
import { loadGameHistory, updateGameState } from '../../../utils/gameState'
import SudokuVictory from '../../modal/SudoVictory'
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
	difficulty: {
		label: string
		points: number
		difficulty: number
	}
}

const SudokuBoard = React.memo(
	({
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
		difficulty,
	}: SudokuBoardProps) => {
		const { user } = useSelector((state: RootState) => state.auth)
		const [isVictory, setIsVictory] = React.useState(false)

		const checkVictory = useCallback(() => {
			console.log('victory useCallback')
			if (!gameState.playingBoard.length) return false

			for (let i = 0; i < 9; i++) {
				for (let j = 0; j < 9; j++) {
					if (gameState.playingBoard[i][j] !== gameState.solutionBoard[i][j]) {
						return false
					}
				}
			}
			return true
		}, [gameState.playingBoard, gameState.solutionBoard])

		useEffect(() => {
			console.log('victory')
			if (checkVictory()) {
				setIsVictory(true)
			}
		}, [gameState.playingBoard, checkVictory])

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

				const isCorrectValue = gameState.solutionBoard[rowIndex][colIndex] === selectedNumber

				const updatedGameState = {
					...gameState,
					playingBoard: newBoard,
				}

				setConflicts(prev => {
					const next = new Set(prev)
					if (!isCorrectValue) {
						next.add(cellKey)
					} else {
						next.delete(cellKey)
					}

					const userLastGameHistory = loadGameHistory(user?.username)
					if (userLastGameHistory) {
						const updatedConflicts = {
							...userLastGameHistory,
							boardGame: updatedGameState,
							conflicts: Array.from(next),
						}
						updateGameState(user?.username, updatedConflicts)
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

				setGameState(updatedGameState)
			}
		}

		return (
			<div className='grid grid-cols-9 border-2 border-black'>
				{gameState.playingBoard.map((row, rowIndex) =>
					row.map((cell, colIndex) => {
						const position: CellPosition = [rowIndex, colIndex]
						const cellKey = getCellKey(rowIndex, colIndex)

						const cellState = getCellState(gameState.playingBoard, position, selectedCell, selectedNumber, conflicts)

						return (
							<div
								key={cellKey}
								className={`
                ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-black' : ''}
                ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-black' : ''}
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
				{user && (
					<SudokuVictory open={isVictory} setOpen={setIsVictory} username={user.username} difficulty={difficulty} />
				)}
			</div>
		)
	}
)

export default SudokuBoard
