import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import { Box, Button, Modal, Paper, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useScreen } from '../../contexts/ScreenContext'
import { useTimer } from '../../contexts/TimerContext'
import { RootState } from '../../store/store'
import { UserData } from '../../types/auth'
import { GameState } from '../../types/sudoku'
import { loadGameHistory, updateGameState } from '../../utils/gameState'
import { loadDataStorage, updateDataStorage } from '../../utils/localStorage'

interface SudoGameOverProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	gameState: GameState
	setGameState: Dispatch<SetStateAction<GameState>>
	setConflicts: Dispatch<SetStateAction<Set<string>>>
	setLives: Dispatch<SetStateAction<number>>
}

const SudoGameOver = ({ open, setOpen, gameState, setGameState, setConflicts, setLives }: SudoGameOverProps) => {
	const { setScreen } = useScreen()
	const { startTimer, stopTimer, resetTimer } = useTimer()
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (open) {
			stopTimer()
		}
	}, [open, stopTimer])

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

	const handleRestartGame = () => {
		if (!user) return
		const loadGameState = loadGameHistory(user.username)
		if (loadGameState) {
			setOpen(false)
			setScreen('game')
			resetTimer()
			startTimer()

			const updatedGameState = {
				...gameState,
				playingBoard: [...loadGameState.boardGame.originalBoard.map(row => [...row])],
			}

			const updateHistoryBoard = {
				...loadGameState,
				conflicts: [],
				boardGame: {
					...updatedGameState,
					originalBoard: [...loadGameState.boardGame.originalBoard.map(row => [...row])],
				},
			}

			const initialLives = loadGameState.boardDifficulty.label === 'Легкая' ? 5 : 3
			setLives(initialLives)

			updateGameState(user.username, updateHistoryBoard)
			setGameState(updatedGameState)
			setConflicts(new Set())
		}
	}

	return (
		<Modal
			open={open}
			aria-labelledby='modal-game-over'
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
						id='modal-game-over'
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 700,
							color: 'text.primary',
						}}
					>
						Закончились жизни
					</Typography>

					<HeartBrokenIcon
						sx={{
							fontSize: 100,
							color: 'error.light',
							my: 2,
						}}
					/>

					<Box
						sx={{
							display: 'flex',
							gap: 2,
							mt: 2,
						}}
					>
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
							}}
						>
							Новая игра
						</Button>
						<Button
							variant='outlined'
							onClick={handleRestartGame}
							sx={{
								borderColor: 'primary.main',
								color: 'primary.main',
								'&:hover': {
									borderColor: 'primary.dark',
									bgcolor: 'primary.50',
								},
								textTransform: 'none',
								fontWeight: 600,
							}}
						>
							Рестарт
						</Button>
					</Box>
				</Box>
			</Paper>
		</Modal>
	)
}

export default SudoGameOver
