import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import { AppDispatch, RootState } from '../../store/store'
import { getNextLevelThreshold } from '../../utils/levelSystem'
import { loadDataStorage } from '../../utils/localStorage'

interface HomeScreenProps {
	onClickNewGame: () => void
	onClickContinueGame: () => void
}

export default function HomeScreen({ onClickNewGame, onClickContinueGame }: HomeScreenProps) {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const { user } = useSelector((state: RootState) => state.auth)

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	//const gameState = loadGameState(user?.username)

	const userData = loadDataStorage(user?.username, 'usersData')
	const nextLevelExp = userData ? getNextLevelThreshold(userData?.level) : 100

	return (
		<div className='block relative h-[100%]'>
			<button
				onClick={handleLogout}
				className='text-gray-500 hover:text-gray-700 font-bold p-2 rounded hover:shadow-md absolute top-[-40px] right-[-20px] transition-all duration-200'
			>
				<LogOut />
			</button>
			<div className='flex flex-col text-center gap-2'>
				<h2 className='text-6xl font-bold'>{userData?.level || 1}</h2>
				<p className='text-3xl'>Уровень</p>
				<p className='text-lg'>
					{userData?.experience || 0}/{nextLevelExp} очков
				</p>
			</div>
			<div className='flex flex-col gap-2 absolute bottom-0 w-[100%]'>
				{userData?.currentGameState && (
					<button
						onClick={onClickContinueGame}
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md  transition-color duration-200'
					>
						Продолжить игру
					</button>
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
