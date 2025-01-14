import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTimer } from '../../contexts/TimerContext'
import { Difficulty } from '../../types/sudoku'

interface SudokuInfoProps {
	difficulty: Difficulty
	conflicts: Set<string>
}

const SudokuInfo = React.memo(({ difficulty, conflicts }: SudokuInfoProps) => {
	const initialLive = difficulty?.label === 'Легкая' ? 5 : 3

	const generateHearts = (redCount: number) =>
		Array.from({ length: initialLive }, (_, index) => (
			<Heart
				className={index < redCount ? 'text-red-500 fill-red-300' : 'text-gray-500 fill-gray-300'}
				size={20}
				key={index}
			/>
		)).reverse()
	const [countLives, setCountLives] = useState(generateHearts(initialLive))

	useEffect(() => {
		if (conflicts && conflicts.size >= 0 && countLives.length > 0) {
			setCountLives(generateHearts(initialLive - conflicts.size))
		}
	}, [conflicts])

	const { timer } = useTimer()

	return (
		<div className='grid grid-cols-3 justify-between items-center leading-none mb-4 text-gray-400'>
			<div className='flex flex-col items-start gap-1'>
				<span className='text-[0.8rem]'>Сложность</span>
				<span className='text-[1rem] text-gray-600 font-medium'>{difficulty?.label}</span>
			</div>
			<div className='flex flex-col items-center text-[1rem] text-gray-600 font-medium'>{timer}</div>
			<div className='flex flex-col items-end gap-1'>
				<span className='text-[0.8rem]'>Жизни</span>
				<div className='flex'>{countLives}</div>
			</div>
		</div>
	)
})

export default SudokuInfo
