import { useEffect, useState } from 'react'
import SudokuAction from '../components/sudokuStart/sudokuActions/SudokuAction'
import SudokuBoard from '../components/sudokuStart/sudokuBoard/SudokuBoard'
import SudokuInfo from '../components/sudokuStart/SudokuInfo'
import SudokuNumber from '../components/sudokuStart/sudokuNumbers/SudokuNumber'
import { useSudokuSelection } from '../hooks/useSudokuSelection'
import { GameState } from '../types/sudoku'
import { generateSudoku } from '../utils/sudokuGenerator'

export default function GameStart({ difficulty }: any) {
	const [gameState, setGameState] = useState<GameState>({
		playingBoard: [],
		solutionBoard: [],
	})
	const [conflicts, setConflicts] = useState<Set<string>>(new Set())
	const { selectedCell, setSelectedCell, selectedNumber, setSelectedNumber } =
		useSudokuSelection(gameState.playingBoard, conflicts)
	const [newValues, setNewValues] = useState<Set<string>>(new Set())
	const [statusNote, setStatusNote] = useState<boolean>(false)

	useEffect(() => {
		startGame()
	}, [])

	const startGame = () => {
		const newGame = generateSudoku(difficulty?.difficulty)
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
