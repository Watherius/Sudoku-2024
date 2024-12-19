import { useAuthStore } from '../store/authStore'

export const SudokuMain = () => {
	const user = useAuthStore(state => state.user)
	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
			<div className='w-[300px] bg-white flex flex-col rounded-xl shadow-xl gap-16 px-10 py-16'>
				<div className='flex flex-col items-center gap-2'>
					<h1 className='text-6xl font-bold'>{user?.level}</h1>
					<h2 className='text-xl'>Уровень</h2>
					<span className='mt-2'>
						Очков {user?.experience} / {user?.maxExperience}
					</span>
				</div>
				<div className='flex flex-col gap-2'>
					{user?.gameInProgress ? (
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Продолжить игру
						</button>
					) : (
						''
					)}
					<button className='bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded shadow-md'>
						Новая игра
					</button>
				</div>
			</div>
		</div>
	)
}
