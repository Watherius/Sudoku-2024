import { GameState } from '../../types/sudoku'
import NumberButton from './NumberButton'

interface SelectNumberProps {
	gameState: GameState
	conflicts: Set<string>
	selectedNumber: number | null
	setSelectedNumber: (number: number | null) => void
}

export default function SudokuNumber({
	gameState,
	conflicts,
	selectedNumber,
	setSelectedNumber,
}: SelectNumberProps) {
	const remainingValues = (num: number): number => {
		let count = 9
		if (!gameState.playingBoard.length) return count
		for (let x = 0; x < 9; x++)
			for (let y = 0; y < 9; y++) {
				if (
					!conflicts.has(`${x},${y}`) &&
					gameState?.playingBoard[x][y] === num
				)
					count--
			}
		return count
	}

	return (
		<div className='grid grid-cols-9 gap-2 mt-4'>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
				<NumberButton
					key={num}
					number={num}
					isSelected={selectedNumber === num}
					count={remainingValues(num)}
					onClick={() => setSelectedNumber(selectedNumber === num ? null : num)}
				/>
			))}
		</div>
	)
}
