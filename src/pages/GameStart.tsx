import { useEffect, useState } from 'react'
import SudokuAction from '../components/sudokuStart/sudokuActions/SudokuAction'
import SudokuBoard from '../components/sudokuStart/sudokuBoard/SudokuBoard'
import SudokuInfo from '../components/sudokuStart/SudokuInfo'
import SudokuNumber from '../components/sudokuStart/sudokuNumbers/SudokuNumber'
import { useSudokuSelection } from '../hooks/useSudokuSelection'
import { useAuthStore } from '../store/authStore'
import { GameState } from '../types/sudoku'
import { generateSudoku } from '../utils/sudokuGenerator'

export default function GameStart({ level, setLevel }: any) {
	const [gameState, setGameState] = useState<GameState>({
		playingBoard: [],
		solutionBoard: [],
	})
	const [conflicts, setConflicts] = useState<Set<string>>(new Set())
	const { selectedCell, setSelectedCell, selectedNumber, setSelectedNumber } =
		useSudokuSelection(gameState.playingBoard, conflicts)
	const [newValues, setNewValues] = useState<Set<string>>(new Set())
	const [statusNote, setStatusNote] = useState<boolean>(false)

	const user = useAuthStore(state => state.user)
	const stateGame = useAuthStore(state => state.stateGame)

	useEffect(() => {
		startGame()
	}, [])

	useEffect(() => {
		if (user && user.currentGameState && user.currentGameData) {
			const previousGame = user.currentGameData
			const previousLevelGame = previousGame.boardDifficulty

			setGameState(previousGame.boardGame)
			setLevel({
				label: previousLevelGame.label,
				points: previousLevelGame.points,
				difficulty: previousLevelGame.difficulty,
			})
		} else {
			startGame()
		}
	}, [user])

	const startGame = () => {
		const newGame = generateSudoku(level?.difficulty)
		setGameState(newGame)
		setConflicts(new Set())
		setSelectedCell(null)
		setSelectedNumber(null)

		if (user && !user.currentGameState) {
			stateGame(true, newGame, level)
		}
	}

	useEffect(() => {
		console.log(gameState)
	}, [gameState])

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl shadow-xl p-6'>
				<SudokuInfo difficulty={level} />
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
