import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SudokuAction from '../components/sudokuStart/sudokuActions/SudokuAction'
import SudokuBoard from '../components/sudokuStart/sudokuBoard/SudokuBoard'
import SudokuInfo from '../components/sudokuStart/SudokuInfo'
import SudokuNumber from '../components/sudokuStart/sudokuNumbers/SudokuNumber'
import { useTimer } from '../contexts/TimerContext'
import { updateUserProgress } from '../hooks/useProgress'
import { useSudokuSelection } from '../hooks/useSudokuSelection'
import { RootState } from '../store/store'
import { GameState } from '../types/sudoku'
import { loadGameState, saveGameState } from '../utils/gameState'
import { generateSudoku } from '../utils/sudokuGenerator'

export default function GameStart({ level, setLevel }: any) {
	const [gameState, setGameState] = useState<GameState>({
		playingBoard: [],
		solutionBoard: [],
	})
	const [conflicts, setConflicts] = useState<Set<string>>(new Set())
	const { selectedCell, setSelectedCell, selectedNumber, setSelectedNumber } = useSudokuSelection(
		gameState.playingBoard,
		conflicts
	)
	const [newValues, setNewValues] = useState<Set<string>>(new Set())
	const [statusNote, setStatusNote] = useState<boolean>(false)

	const { user } = useSelector((state: RootState) => state.auth)
	const { startTimer, resetTimer } = useTimer()

	useEffect(() => {
		if (!user) return

		const savedGameState = loadGameState(user.username)
		if (savedGameState?.boardGame) {
			const savedTimer = localStorage.getItem('gameTimer')
			setGameState(savedGameState.boardGame)
			setLevel(savedGameState.boardDifficulty)
			setConflicts(new Set(savedGameState.conflicts))
			if (savedTimer) startTimer(savedTimer)
		} else {
			startGame()
		}
	}, [user])

	const startGame = () => {
		if (!user) return

		const newGame = generateSudoku(level?.difficulty)
		setGameState(newGame)
		setSelectedCell(null)
		setSelectedNumber(null)
		resetTimer()
		startTimer()

		const historyLastGames = loadGameState(user?.username)
		console.log('historyLastGames: ', historyLastGames)
		if (user && !historyLastGames) {
			const newGameState = {
				username: user?.username,
				currentGameState: true,
				boardGame: newGame,
				boardDifficulty: level,
				conflicts: Array.from(conflicts),
			}
			saveGameState(user.username, newGameState)
		}
	}

	const handleGameComplete = () => {
		if (!user || !level) return

		// Обновляем прогресс пользователя
		updateUserProgress(user.username, level.points)

		// Очищаем состояние игры
		//saveGameState(user.username, { currentGameState: false })
	}

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
					//onGameComplete={handleGameComplete}
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
