import { SudokuActionButtonProps } from '../../types/sudoku'

export default function ActionButton({
	buttonStyle,
	buttonIcon,
	buttonText,
	onClick,
	isActive,
}: SudokuActionButtonProps) {
	return (
		<button
			className={`${buttonStyle} ${isActive ? 'text-indigo-700' : ''}`}
			onClick={onClick}
		>
			{buttonIcon}
			{buttonText}
		</button>
	)
}
