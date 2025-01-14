import { CornerDownLeft } from 'lucide-react'

import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Difficulty } from '../../types/sudoku'
import { clearGameState, loadGameHistory } from '../../utils/gameState'

interface DifficultyScreenProps {
	onClick: () => void
	setLevel: Dispatch<SetStateAction<Difficulty>>
	setScreen: Dispatch<SetStateAction<'game' | 'home' | 'difficulty'>>
}

const difficulties = [
	{ label: 'Легкая', points: 50, difficulty: 36 },
	{ label: 'Средняя', points: 100, difficulty: 46 },
	{ label: 'Сложная', points: 150, difficulty: 53 },
	{ label: 'Эксперт', points: 200, difficulty: 57 },
	{ label: 'Мастер', points: 300, difficulty: 58 },
]

export default function DifficultyScreen({ onClick, setLevel, setScreen }: DifficultyScreenProps) {
	const { user } = useSelector((state: RootState) => state.auth)

	const handledifficultyClick = (label: string, points: number, difficulty: number) => {
		const userHistoryGame = loadGameHistory(user?.username)
		if (user && userHistoryGame) clearGameState(user.username)

		setLevel({ label: label, points: points, difficulty: difficulty })
		setScreen('game')
	}

	return (
		<div className='relative'>
			<button
				onClick={onClick}
				className='absolute top-[-2rem] right-[-0.5rem] text-gray-400 hover:text-gray-500 cursor-pointer transition-colors duration-200'
			>
				<CornerDownLeft />
			</button>
			<h2 className='text-xl text-center font-bold mb-4'>Выберите сложность</h2>
			<div className='flex flex-col items-center gap-4'>
				{difficulties.map((diff, index) => (
					<button
						key={index}
						className='w-[100%] bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded shadow-md'
						onClick={() => handledifficultyClick(diff.label, diff.points, diff.difficulty)}
					>
						{diff.label} (+{diff.points})
					</button>
				))}
			</div>
		</div>
	)
}
