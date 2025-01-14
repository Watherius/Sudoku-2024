import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SudokuAction from '../components/sudokuStart/sudokuActions/SudokuAction'
import SudokuBoard from '../components/sudokuStart/sudokuBoard/SudokuBoard'
import SudokuInfo from '../components/sudokuStart/SudokuInfo'
import SudokuNumber from '../components/sudokuStart/sudokuNumbers/SudokuNumber'
import { useTimer } from '../contexts/TimerContext'
import { useSudokuSelection } from '../hooks/useSudokuSelection'
import { RootState } from '../store/store'
import { UserData } from '../types/auth'
import { Difficulty, GameState } from '../types/sudoku'
import { loadGameHistory, saveGameState } from '../utils/gameState'
import { loadDataStorage, updateDataStorage } from '../utils/localStorage'
import { generateSudoku } from '../utils/sudokuGenerator'

interface GameStartProps {
	level: Difficulty
	setLevel: Dispatch<SetStateAction<Difficulty>>
}

export default function GameStart({ level, setLevel }: GameStartProps) {
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

		const savedGameState = loadGameHistory(user.username)
		if (savedGameState) {
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

		const userGameHistory = loadGameHistory(user.username)
		if (user && !userGameHistory) {
			const createHistoryGameForUser = {
				username: user.username,
				boardGame: newGame,
				boardDifficulty: level,
				conflicts: Array.from(conflicts),
			}
			saveGameState(user.username, createHistoryGameForUser)

			const userData = loadDataStorage(user.username, 'usersData')
			const updatedUserData = {
				...userData,
				currentGameState: true,
			} as UserData
			updateDataStorage(user.username, 'usersData', updatedUserData)
		}
	}

	/*const handleGameComplete = () => {
		if (!user || !level) return

		// Обновляем прогресс пользователя
		//updateUserProgress(user.username, level.points)

		// Очищаем состояние игры
		//saveGameState(user.username, { currentGameState: false })
	}*/

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl shadow-xl p-6'>
				<SudokuInfo difficulty={level} conflicts={conflicts} />
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
