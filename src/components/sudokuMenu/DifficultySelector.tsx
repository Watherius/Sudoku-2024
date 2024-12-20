import { CornerDownLeft } from 'lucide-react'

const difficulties = [
	{ label: 'Легкая', points: 50 },
	{ label: 'Средняя', points: 100 },
	{ label: 'Сложная', points: 150 },
	{ label: 'Эксперт', points: 200 },
	{ label: 'Мастер', points: 300 },
]

export default function DifficultySelector({ onClick }: any) {
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
					>
						{diff.label} (+{diff.points})
					</button>
				))}
			</div>
		</div>
	)
}
