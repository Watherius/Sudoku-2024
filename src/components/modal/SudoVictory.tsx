import { EmojiEvents } from '@mui/icons-material'
import { Box, Button, Modal, Paper, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useScreen } from '../../contexts/ScreenContext'
import { useTimer } from '../../contexts/TimerContext'
import { updateUserProgress } from '../../hooks/useProgress'
import { RootState } from '../../store/store'
import { UserData } from '../../types/auth'
import { Difficulty } from '../../types/sudoku'
import { clearGameState } from '../../utils/gameState'
import { loadDataStorage, updateDataStorage } from '../../utils/localStorage'

interface SudokuVictoryProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	username: string
	difficulty: Difficulty
}

const SudokuVictory = ({ open, setOpen, username, difficulty }: SudokuVictoryProps) => {
	const { setScreen } = useScreen()
	const { stopTimer } = useTimer()
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (open) {
			stopTimer()
			updateUserProgress(username, difficulty.points)
			clearGameState(username)
		}
	}, [open, stopTimer, username, difficulty.points])

	const userData = loadDataStorage(username, 'usersData')

	const handleNewGame = () => {
		setOpen(false)
		setScreen('difficulty')

		const userData = loadDataStorage(user?.username, 'usersData')
		const updatedUserData = {
			...userData,
			currentGameState: false,
		} as UserData
		updateDataStorage(user?.username, 'usersData', updatedUserData)
	}

	return (
		<Modal
			open={open}
			aria-labelledby='modal-victory'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Paper
				elevation={24}
				sx={{
					position: 'relative',
					width: 320,
					bgcolor: 'background.paper',
					borderRadius: 3,
					p: 4,
					outline: 'none',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography
						id='modal-victory'
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 700,
							color: 'primary.main',
							textAlign: 'center',
						}}
					>
						Поздравляем!
					</Typography>

					<EmojiEvents
						sx={{
							fontSize: 100,
							color: 'warning.light',
							my: 2,
						}}
					/>

					<Box sx={{ textAlign: 'center', mb: 2 }}>
						<Typography variant='body1' sx={{ mb: 1 }}>
							Вы успешно решили судоку!
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Получено {difficulty.points} очков опыта
						</Typography>
						<Typography variant='body2' color='primary'>
							Текущий уровень: {userData?.level || 1}
						</Typography>
					</Box>

					<Button
						variant='contained'
						onClick={handleNewGame}
						sx={{
							bgcolor: 'primary.main',
							color: 'white',
							'&:hover': {
								bgcolor: 'primary.dark',
							},
							textTransform: 'none',
							fontWeight: 600,
							width: '100%',
						}}
					>
						Новая игра
					</Button>
				</Box>
			</Paper>
		</Modal>
	)
}

export default SudokuVictory
