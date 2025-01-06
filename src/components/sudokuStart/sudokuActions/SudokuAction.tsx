import { Lightbulb, PenLine, Undo2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { SudokuActionsProps } from '../../../types/sudoku'
import { addRandomValue, removeConflictElement, toggleNoteMode } from '../../../utils/sudokuActions'
import ActionButton from './ActionButton'

export default function SudokuActions({
	gameState,
	setGameState,
	conflicts,
	setConflicts,
	setSelectedCell,
	setNewValues,
	setSelectedNumber,
	statusNote,
	setStatusNote,
}: SudokuActionsProps) {
	const { user } = useSelector((state: RootState) => state.auth)

	const buttonIconSize = 32

	const getButtonClass = () => {
		return `w-full h-[4rem] flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-indigo-700 text-center text-[0.85rem] font-[500] tracking-wide outline-none cursor-pointer transition-colors duration-200`
	}

	return (
		<div className='grid grid-cols-3 mt-8'>
			<ActionButton
				buttonIcon={<Undo2 size={buttonIconSize} />}
				buttonStyle={getButtonClass()}
				buttonText='Стереть'
				onClick={() => removeConflictElement(gameState, setGameState, conflicts, setConflicts, user)}
			/>
			<ActionButton
				buttonIcon={<Lightbulb size={buttonIconSize} />}
				buttonStyle={getButtonClass()}
				buttonText='Подсказка'
				onClick={() => {
					if (setSelectedCell && setNewValues && setSelectedNumber) {
						addRandomValue(gameState, setGameState, setSelectedCell, setNewValues, setSelectedNumber)
					}
				}}
			/>
			<ActionButton
				buttonIcon={<PenLine size={buttonIconSize} />}
				buttonStyle={getButtonClass()}
				buttonText='Заметки'
				isActive={statusNote}
				onClick={() => {
					if (setStatusNote && setSelectedNumber) {
						toggleNoteMode(statusNote, setStatusNote /*, setSelectedNumber*/)
					}
				}}
			/>
		</div>
	)
}
