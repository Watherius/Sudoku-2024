import { Dispatch, SetStateAction } from 'react'

export type Board = number[][]
export type CellPosition = [number, number]
export type SelectedNumber = number | null

export interface SudokuValidationProps {
	board: Board
	row: number
	col: number
	num: number
	conflicts?: Set<string>
}

export interface CellState {
	isSelected: boolean
	isSameNumber: boolean
	isHighlighted: boolean
	isInSameBox: boolean
	hasConflict: boolean
	showValidPlacement: boolean
}

export interface GameState {
	originalBoard: Board
	playingBoard: Board
	solutionBoard: Board
}

export interface Difficulty {
	label: string
	points: number
	difficulty: number
}

export interface SudokuActionButtonProps {
	buttonStyle: string
	buttonIcon: JSX.Element
	buttonText: string
	onClick: () => void
	statusNote?: boolean
	isActive?: boolean
}

export interface SudokuActionsProps {
	gameState: GameState
	setGameState: Dispatch<SetStateAction<GameState>>
	conflicts: Set<string>
	setConflicts: Dispatch<SetStateAction<Set<string>>>
	setSelectedNumber?: (number: number | null) => void
	setSelectedCell?: (cell: CellPosition | null) => void
	setNewValues?: Dispatch<SetStateAction<Set<string>>>
	statusNote?: boolean
	setStatusNote?: Dispatch<SetStateAction<boolean>>
}
