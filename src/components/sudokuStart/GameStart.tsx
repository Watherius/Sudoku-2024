import { useEffect, useState } from 'react'
import { useSudokuSelection } from '../../hooks/useSudokuSelection'
import { GameState } from '../../types/sudoku'
import { generateSudoku } from '../../utils/sudokuGenerator'
import SudokuAction from './sudokuActions/SudokuAction'
import SudokuBoard from './sudokuBoard/SudokuBoard'
import SudokuInfo from './SudokuInfo'
import SudokuNumber from './sudokuNumbers/SudokuNumber'

export default function GameStart() {
	const [gameState, setGameState] = useState<GameState>({
		playingBoard: [],
		solutionBoard: [],
	})
	const [conflicts, setConflicts] = useState<Set<string>>(new Set())
	const { selectedCell, setSelectedCell, selectedNumber, setSelectedNumber } =
		useSudokuSelection(gameState.playingBoard, conflicts)
	const [newValues, setNewValues] = useState<Set<string>>(new Set())
	const [statusNote, setStatusNote] = useState<boolean>(false)
	const [difficulty, setDifficulty] = useState<number | undefined>(35)

	useEffect(() => {
		startGame()
	}, [])

	const startGame = () => {
		const newGame = generateSudoku(difficulty)
		setGameState(newGame)
		setConflicts(new Set())
		setSelectedCell(null)
		setSelectedNumber(null)
	}

	useEffect(() => {
		console.log(gameState)
	}, [gameState])

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl shadow-xl p-6'>
				<SudokuInfo difficulty={difficulty} />
				<SudokuBoard
					gameState={gameState}
					setGameState={setGameState}
					selectedCell={selectedCell}
					setSelectedCell={setSelectedCell}
					selectedNumber={selectedNumber}
					conflicts={conflicts}
					setConflicts={setConflicts}
					newValues={newValues}
					setNewValues={setNewValues}
					statusNote={statusNote}
				/>
				<SudokuAction
					gameState={gameState}
					setGameState={setGameState}
					conflicts={conflicts}
					setConflicts={setConflicts}
					setSelectedCell={setSelectedCell}
					setNewValues={setNewValues}
					setSelectedNumber={setSelectedNumber}
					statusNote={statusNote}
					setStatusNote={setStatusNote}
				/>
				<SudokuNumber
					gameState={gameState}
					conflicts={conflicts}
					selectedNumber={selectedNumber}
					setSelectedNumber={setSelectedNumber}
				/>
			</div>
		</div>
	)
}
