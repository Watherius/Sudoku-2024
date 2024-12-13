import { useState } from 'react'

interface SudokuCellNoteProps {
	isSameNumber: boolean
	selectedNumber: number | null
}

export default function SudokuCellNote({
	isSameNumber,
	selectedNumber,
}: SudokuCellNoteProps) {
	const [notes, setNotes] = useState<Set<number>>(new Set())

	const handleNoteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (selectedNumber !== null) {
			setNotes(prev => {
				const next = new Set(prev)
				if (next.has(selectedNumber)) {
					next.delete(selectedNumber)
				} else {
					next.add(selectedNumber)
				}
				return next
			})
		}
	}

	const getNoteClass = (num: number) => {
		if (selectedNumber === num && isSameNumber) return 'bg-blue-300'
		return 'text-indigo-700'
	}

	return (
		<div
			className='absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 text-[10px] font-medium'
			onClick={handleNoteClick}
		>
			{Array.from({ length: 9 }, (_, index) => index + 1).map(num => (
				<div
					key={num}
					className={`flex items-center justify-center ${getNoteClass(num)}`}
				>
					{notes.has(num) ? num : ''}
				</div>
			))}
		</div>
	)
}
