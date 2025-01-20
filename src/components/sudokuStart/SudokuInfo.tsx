import { Heart } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTimer } from '../../contexts/TimerContext'
import { Difficulty } from '../../types/sudoku'

interface SudokuInfoProps {
	difficulty: Difficulty
	conflicts: Set<string>
	setOpen: Dispatch<SetStateAction<boolean>>
	lives: number
	setLives: Dispatch<SetStateAction<number>>
}

const SudokuInfo = React.memo(({ difficulty, conflicts, setOpen, lives, setLives }: SudokuInfoProps) => {
	const initialLives = difficulty?.label === 'Легкая' ? 5 : 3
	const [prevConflictsSize, setPrevConflictsSize] = useState(0)
	const { timer } = useTimer()

	useEffect(() => {
		setLives(initialLives)
	}, [difficulty, initialLives, setLives])

	useEffect(() => {
		if (conflicts.size > prevConflictsSize) {
			setLives(prev => {
				const newLives = prev - 1
				if (newLives <= 0) {
					setOpen(true)
				}
				return newLives
			})
		}
		setPrevConflictsSize(conflicts.size)
	}, [conflicts.size, setOpen, prevConflictsSize, setLives])

	return (
		<div className='grid grid-cols-3 justify-between items-center leading-none mb-4 text-gray-400'>
			<div className='flex flex-col items-start gap-1'>
				<span className='text-[0.8rem]'>Сложность</span>
				<span className='text-[1rem] text-gray-600 font-medium'>{difficulty?.label}</span>
			</div>
			<div className='flex flex-col items-center text-[1rem] text-gray-600 font-medium'>{timer}</div>
			<div className='flex flex-col items-end gap-1'>
				<span className='text-[0.8rem]'>Жизни</span>
				<div className='flex'>
					{Array.from({ length: initialLives }, (_, index) => (
						<Heart
							key={index}
							className={index < lives ? 'text-red-500 fill-red-300' : 'text-gray-500 fill-gray-300'}
							size={20}
						/>
					))}
				</div>
			</div>
		</div>
	)
})

export default SudokuInfo
