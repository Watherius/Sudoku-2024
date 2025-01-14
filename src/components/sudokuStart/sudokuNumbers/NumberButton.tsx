interface NumberButtonProps {
	number: number
	isSelected: boolean
	count: number
	onClick: () => void
}

export default function NumberButton({ number, isSelected, count, onClick }: NumberButtonProps) {
	return count !== 0 ? (
		<button
			className={`w-10 h-auto py-[0.375rem] flex flex-col items-center justify-center text-lg font-medium hover:bg-blue-50 text-indigo-700 transition-colors  ${
				isSelected ? '!bg-blue-100 hover:!bg-blue-200' : ''
			}  ${!isSelected ? 'bg-white' : ''} `}
			onClick={onClick}
		>
			{number}
			{count ? <span className={`block text-xs text-gray-500`}>{count}</span> : ''}
		</button>
	) : (
		<div></div>
	)
}
