interface SudokuInfoProps {
	difficulty: number | undefined
}

export default function SudokuInfo({ difficulty }: SudokuInfoProps) {
	return (
		<div className='grid grid-cols-3 justify-between leading-none mb-4 text-gray-400'>
			<div className='flex flex-col items-start'>
				<span className={`text-[0.8rem]`}>Сложность</span>
				<span className={`text-[1rem] font-medium`}>
					{difficulty === 35 ? 'Средняя' : ''}
				</span>
			</div>
			<div className='flex flex-col items-center'>
				<span className={`text-[1rem] font-medium`}>00:00</span>
			</div>
			<div className='flex flex-col items-end'>
				<span className={`text-[0.8rem]`}>Жизни</span>
			</div>
		</div>
	)
}
