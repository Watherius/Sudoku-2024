import { useAuthStore } from '../../store/authStore'

export default function LevelDisplay({ onClick }: any) {
	const user = useAuthStore(state => state.user)
	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col text-center gap-2'>
				<h2 className='text-6xl font-bold'>{user?.level}</h2>
				<p className='text-3xl'>Уровень</p>
				<p className='text-lg'>
					{user?.experience}/{user?.maxExperience} очков
				</p>
			</div>
			<div className='flex flex-col mt-[100px] gap-2'>
				{user?.gameInProgress ? (
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Продолжить игру
					</button>
				) : (
					''
				)}
				<button
					onClick={onClick}
					className='bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded shadow-md'
				>
					Новая игра
				</button>
			</div>
		</div>
	)
}
