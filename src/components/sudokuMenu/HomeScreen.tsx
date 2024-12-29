import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import { useAuthStore } from '../../store/authStore'

interface HomeScreenProps {
	onClickNewGame: () => void
	onClickContinueGame: () => void
}

export default function HomeScreen({ onClickNewGame, onClickContinueGame }: HomeScreenProps) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	const user = useAuthStore(state => state.user)

	return (
		<div className='block relative h-[100%]'>
			<button
				onClick={handleLogout}
				className='text-gray-500 hover:text-gray-700 font-bold p-2 rounded hover:shadow-md absolute top-[-40px] right-[-20px] transition-all duration-200'
			>
				<LogOut />
			</button>
			<div className='flex flex-col text-center gap-2'>
				<h2 className='text-6xl font-bold'>{user?.level}</h2>
				<p className='text-3xl'>Уровень</p>
				<p className='text-lg'>
					{user?.experience}/{user?.maxExperience} очков
				</p>
			</div>
			<div className='flex flex-col gap-2 absolute bottom-0 w-[100%]'>
				{user?.currentGameState ? (
					<button
						onClick={onClickContinueGame}
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md  transition-color duration-200'
					>
						Продолжить игру
					</button>
				) : (
					''
				)}
				<button
					onClick={onClickNewGame}
					className='bg-white hover:bg-slate-100 text-blue-600 font-bold py-2 px-4 rounded shadow-md transition-color duration-200'
				>
					Новая игра
				</button>
			</div>
		</div>
	)
}
