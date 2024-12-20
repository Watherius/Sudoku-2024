import { useState } from 'react'

import DifficultyScreen from '../components/sudokuMenu/DifficultyScreen'
import HomeScreen from '../components/sudokuMenu/HomeScreen'
import { Difficulty } from '../types/sudoku'
import GameStart from './GameStart'

export default function MainMenu() {
	const [screen, setScreen] = useState<'home' | 'difficulty' | 'game'>('home')
	const [level, setLevel] = useState<Difficulty>({
		label: '',
		points: 0,
		difficulty: 36,
	})

	const handleNewGameClick = () => {
		setScreen('difficulty')
	}

	const handleBackClick = () => {
		setScreen('home')
		setLevel({ label: '', points: 0, difficulty: 36 })
	}

	return (
		<>
			{screen === 'game' ? (
				<GameStart difficulty={level} />
			) : (
				<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
					<div className='w-[350px] h-[430px] bg-white flex flex-col rounded-xl shadow-xl px-10 py-16'>
						{screen === 'home' && (
							<HomeScreen onClick={() => handleNewGameClick()} />
						)}
						{screen === 'difficulty' && (
							<DifficultyScreen
								onClick={() => handleBackClick()}
								setLevel={setLevel}
								setScreen={setScreen}
							/>
						)}
					</div>
				</div>
			)}
		</>
	)
}
