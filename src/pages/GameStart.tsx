import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SudokuAction from '../components/sudokuStart/sudokuActions/SudokuAction'
import SudokuBoard from '../components/sudokuStart/sudokuBoard/SudokuBoard'
import SudokuInfo from '../components/sudokuStart/SudokuInfo'
import SudokuNumber from '../components/sudokuStart/sudokuNumbers/SudokuNumber'
import { useSudokuSelection } from '../hooks/useSudokuSelection'
import { RootState } from '../store/store'
import { GameState } from '../types/sudoku'
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

	//const [timer, setTimer] = useState<number>(0)
	//const [isRunningTimer, setIsRunningTimer] = useState<boolean>(false)

	const { user } = useSelector((state: RootState) => state.auth)
	const userGameData = JSON.parse(localStorage.getItem('userGameData') as string)
	const gameData = JSON.parse(localStorage.getItem('gameData') as string)

	useEffect(() => {
		if (user && gameData) {
			const previousLevelGame = gameData.boardDifficulty

			setGameState(gameData.boardGame)
			setLevel({
				label: previousLevelGame.label,
				points: previousLevelGame.points,
				difficulty: previousLevelGame.difficulty,
			})
			//setTimer(previousGame.boardTimer || 0) // Устанавливаем сохраненное значение таймера
			//setIsRunningTimer(true)
		} else {
			startGame()
		}
	}, [user])

	const startGame = () => {
		const newGame = generateSudoku(level?.difficulty)
		setGameState(newGame)
		setSelectedCell(null)
		setSelectedNumber(null)

		console.log('userGameData.currentGameState', !userGameData.currentGameState)
		if (user && !userGameData.currentGameState) {
			userGameData.currentGameState = true
			localStorage.setItem(`userGameData`, JSON.stringify(userGameData))
			const gameData = {
				username: user.username,
				boardGame: newGame,
				boardDifficulty: level,
			}
			localStorage.setItem('gameData', JSON.stringify(gameData))
			//setTimer(0) // Сбрасываем таймер при новой игре
			//setIsRunningTimer(true)
		}
	}

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl shadow-xl p-6'>
				<SudokuInfo
					difficulty={level}
					//gameTimer={GameTimer({ timer, setTimer, isRunningTimer })}
				/>
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
					level={level}
					//timer={timer}
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
