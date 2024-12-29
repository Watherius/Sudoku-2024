import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DifficultyScreen from '../components/sudokuMenu/DifficultyScreen'
import HomeScreen from '../components/sudokuMenu/HomeScreen'
import { RootState } from '../store/store'
import { Difficulty } from '../types/sudoku'
import GameStart from './GameStart'

export default function MainMenu() {
	const navigate = useNavigate()
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)

	const [screen, setScreen] = useState<'home' | 'difficulty' | 'game'>('home')
	const [level, setLevel] = useState<Difficulty>({
		label: '',
		points: 0,
		difficulty: 36,
	})

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [isAuthenticated, navigate])

	const handleNewGameClick = () => {
		setScreen('difficulty')
	}

	const handleBackClick = () => {
		setScreen('home')
		setLevel({ label: '', points: 0, difficulty: 36 })
	}

	const handleContinueGameClick = () => {
		setScreen('game')
	}

	/*const newUser = {
		level: 1,
		experience: 0,
		maxExperience: 500,
		gameInProgress: false,
		currentGameState: false,
	}*/

	//localStorage.setItem('gameData', JSON.stringify(updatedUsers))

	return (
		<>
			{screen === 'game' ? (
				<GameStart level={level} setLevel={setLevel} />
			) : (
				<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
					<div className='w-[350px] h-[430px] bg-white flex flex-col rounded-xl shadow-xl px-10 py-16'>
						{screen === 'home' && (
							<HomeScreen
								onClickNewGame={() => {
									handleNewGameClick()
								}}
								onClickContinueGame={() => {
									handleContinueGameClick()
								}}
							/>
						)}
						{screen === 'difficulty' && (
							<DifficultyScreen onClick={() => handleBackClick()} setLevel={setLevel} setScreen={setScreen} />
						)}
					</div>
				</div>
			)}
		</>
	)
}
