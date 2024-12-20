import { useState } from 'react'
import DifficultySelector from '../components/sudokuMenu/DifficultySelector'
import LevelDisplay from '../components/sudokuMenu/LevelDisplay'

export const MainMenu = () => {
	const [showDifficulty, setShowDifficulty] = useState<boolean>(false)
	const [difficulty, setDifficulty] = useState<number | null>(null)

	const SelectDifficulty = () => (
		<div className='flex flex-col gap-2'>
			<h2 className='text-xl text-center mb-4'>Выберите сложность</h2>
			<button
				onClick={() => setDifficulty(20)}
				className='bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded shadow-md'
			>
				Лёгкая
			</button>
			<button
				onClick={() => setDifficulty(35)}
				className='bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded shadow-md'
			>
				Средняя
			</button>
			<button
				onClick={() => setDifficulty(45)}
				className='bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded shadow-md'
			>
				Сложная
			</button>
			<button
				onClick={() => setDifficulty(55)}
				className='bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded shadow-md'
			>
				Эксперт
			</button>
		</div>
	)

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
			<div className='w-[350px] h-[430px] bg-white flex flex-col rounded-xl shadow-xl gap-16 px-10 py-16'>
				{showDifficulty ? (
					<DifficultySelector onClick={() => setShowDifficulty(false)} />
				) : (
					<LevelDisplay onClick={() => setShowDifficulty(true)} />
				)}
			</div>
		</div>
	)
}
