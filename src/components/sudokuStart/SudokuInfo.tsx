import { Heart } from 'lucide-react'
import { useTimer } from '../../contexts/TimerContext'

interface SudokuInfoProps {
	difficulty: any
}

export default function SudokuInfo({ difficulty /*gameTimer*/ }: SudokuInfoProps) {
	const life = difficulty?.label === 'Легкая' ? 5 : 3
	const currentLife = Array.from({ length: life }, (_, index) => <Heart color='red' key={index} />)
	const { timer } = useTimer()

	return (
		<div className='grid grid-cols-3 justify-between items-center leading-none mb-4 text-gray-400'>
			<div className='flex flex-col items-start'>
				<span className='text-[0.8rem]'>Сложность</span>
				<span className='text-[1rem] text-gray-600 font-medium'>{difficulty?.label}</span>
			</div>
			{<div className='flex flex-col items-center text-[1rem] text-gray-600 font-medium'>{timer}</div>}
			<div className='flex flex-col items-end'>
				<span className='text-[0.8rem]'>Жизни</span>
				<div className='flex'>{currentLife}</div>
			</div>
		</div>
	)
}
