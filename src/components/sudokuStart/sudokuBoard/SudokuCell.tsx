import { CellState } from '../../../types/sudoku'
import SudokuCellNote from './SudokuCellNode'

interface SudokuCellProps extends CellState {
	value: number | string
	onClick: () => void
	isNewValue: boolean
	statusNote: boolean
	selectedNumber: number | null
}

export default function SudokuCell({
	value,
	isSelected,
	isSameNumber,
	isHighlighted,
	isInSameBox,
	hasConflict,
	showValidPlacement,
	isNewValue,
	onClick,
	statusNote,
	selectedNumber,
}: SudokuCellProps) {
	const getCellClasses = () => {
		if (isSelected && hasConflict) return 'bg-red-600'
		if (isSelected) return 'bg-indigo-700 hover:bg-indigo-800'
		if (showValidPlacement) return 'bg-red-200 hover:bg-red-300'
		if (isSameNumber) return 'bg-blue-300 hover:bg-blue-300'
		if (hasConflict && (isHighlighted || isInSameBox))
			return 'bg-blue-50 text-red-600 hover:bg-blue-100'
		if (isHighlighted || isInSameBox) return 'bg-blue-50 hover:bg-blue-100'
		if (hasConflict) return 'bg-white hover:bg-gray-50'
		return 'bg-white hover:bg-gray-50'
	}

	const getTextColor = () => {
		if (isSelected && hasConflict) return 'text-white'
		if (isSelected) return 'text-white'
		if (hasConflict) return 'text-red-600'
		if (isNewValue) return 'text-blue-600'
		return 'text-gray-900'
	}

	return (
		<div className='relative w-12 h-12'>
			<input
				className={`
          absolute inset-0 w-full h-full
          text-center text-xl font-semibold 
          outline-none cursor-pointer
          transition-colors duration-200
          ${getCellClasses()}
          ${getTextColor()}
        `}
				type='text'
				maxLength={1}
				value={value}
				onClick={onClick}
				readOnly
			/>
			{!value && statusNote && (
				<SudokuCellNote
					isSameNumber={isSameNumber}
					selectedNumber={selectedNumber}
				/>
			)}
		</div>
	)
}
