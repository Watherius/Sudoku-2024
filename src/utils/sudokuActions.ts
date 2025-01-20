import { Dispatch, SetStateAction } from 'react'
import { User } from '../types/auth'
import { CellPosition, GameState } from '../types/sudoku'
import { cloneBoard, getCellKey } from './boardUtils'
import { loadGameHistory, updateGameState } from './gameState'

export function removeConflictElement(
	gameState: GameState,
	setGameState: Dispatch<SetStateAction<GameState>>,
	conflicts: Set<string>,
	setConflicts: Dispatch<SetStateAction<Set<string>>>,
	user: User | null
) {
	if (conflicts.size === 0) return
	const lastConflict = Array.from(conflicts)[conflicts.size - 1]

	const newBoard = cloneBoard(gameState.playingBoard)
	const positionConflict = lastConflict.split(',').map(Number)
	newBoard[positionConflict[0]][positionConflict[1]] = 0

	const updatedGameState = {
		...gameState,
		playingBoard: newBoard,
	}

	if (conflicts.size > 0) {
		setConflicts(prev => {
			const next = new Set(prev)
			next.delete(lastConflict)

			const historyLastGames = loadGameHistory(user?.username)
			if (historyLastGames) {
				const updatedConflicts = {
					...historyLastGames,
					boardGame: updatedGameState,
					conflicts: Array.from(next),
				}
				updateGameState(user?.username, updatedConflicts)
			}

			return next
		})

		return setGameState(updatedGameState)
	}
}

export function addRandomValue(
	gameState: GameState,
	setGameState: Dispatch<SetStateAction<GameState>>,
	setSelectedCell: (cell: CellPosition | null) => void,
	setNewValues: Dispatch<SetStateAction<Set<string>>>,
	setSelectedNumber: (number: number | null) => void
) {
	const emptyCells: [number, number][] = []

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (gameState.playingBoard[row][col] === 0) {
				emptyCells.push([row, col])
			}
		}
	}

	if (emptyCells.length === 0) return

	const randomIndex = Math.floor(Math.random() * emptyCells.length)
	const [row, col] = emptyCells[randomIndex]
	const value = gameState.solutionBoard[row][col]

	const newBoard = cloneBoard(gameState.playingBoard)
	newBoard[row][col] = value

	setNewValues(prev => {
		const next = new Set(prev)
		next.add(getCellKey(row, col))
		return next
	})

	setSelectedCell([row, col])
	setSelectedNumber(value)
	setGameState(prev => ({
		...prev,
		playingBoard: newBoard,
	}))
}

export function toggleNoteMode(
	statusNote: boolean,
	setStatusNote: Dispatch<SetStateAction<boolean>>
	//setSelectedNumber: (number: number | null) => void
) {
	setStatusNote(!statusNote)
	/*if (!statusNote) {
		setSelectedNumber(null)
	}*/
}
