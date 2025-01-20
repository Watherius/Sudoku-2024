import { Board, GameState } from '../types/sudoku'
import { cloneBoard } from './boardUtils'
import { isValidPlacement } from './sudokuValidation'

const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const fillBox = (board: Board, startRow: number, startCol: number): boolean => {
	const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
	let pos = 0

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			board[startRow + i][startCol + j] = numbers[pos]
			pos++
		}
	}

	return true
}

const fillDiagonalBoxes = (board: Board): void => {
	for (let i = 0; i < 9; i += 3) {
		fillBox(board, i, i)
	}
}

const fillRemaining = (board: Board, row: number = 0, col: number = 0): boolean => {
	if (col >= 9 && row < 8) {
		row++
		col = 0
	}

	if (row >= 9 && col >= 9) {
		return true
	}

	if (row < 3) {
		if (col < 3) {
			col = 3
		}
	} else if (row < 6) {
		if (col === Math.floor(row / 3) * 3) {
			col += 3
		}
	} else {
		if (col === 6) {
			row++
			col = 0
			if (row >= 9) {
				return true
			}
		}
	}

	const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])

	for (const num of numbers) {
		if (isValidPlacement({ board, row, col, num })) {
			board[row][col] = num
			if (fillRemaining(board, row, col + 1)) {
				return true
			}
			board[row][col] = 0
		}
	}

	return false
}

const removeCells = (board: Board, difficulty: number): void => {
	let cellsToRemove = difficulty
	while (cellsToRemove > 0) {
		const row = getRandomNumber(0, 8)
		const col = getRandomNumber(0, 8)

		if (board[row][col] !== 0) {
			board[row][col] = 0
			cellsToRemove--
		}
	}
}

export const generateSudoku = (difficulty: number = 35): GameState => {
	const solutionBoard: Board = Array(9)
		.fill(null)
		.map(() => Array(9).fill(0))

	fillDiagonalBoxes(solutionBoard)
	fillRemaining(solutionBoard)

	const playingBoard = cloneBoard(solutionBoard)
	const originalBoard = playingBoard

	removeCells(playingBoard, difficulty)

	return {
		originalBoard,
		playingBoard,
		solutionBoard,
	}
}
