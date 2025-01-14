import { GameState } from '../types/sudoku'

interface loadingGameHistoryProps {
	username: string
	boardGame: GameState
	boardDifficulty: {
		label: string
		points: number
		difficulty: number
	}
	conflicts: string[]
}

export const loadGameHistory = (username: string | undefined): loadingGameHistoryProps | null => {
	try {
		if (!username) return null

		const historyGames = localStorage.getItem('historyGames')
		if (!historyGames) {
			//console.warn('No game data found in localStorage')
			/*const historyUser: userGameStateProps = { id: crypto.randomUUID(), username: username }
			localStorage.setItem('historyGames', JSON.stringify(historyUser))
			return historyUser*/
			return null
		}

		/*const gameData = JSON.parse(historyGames)
		if (typeof gameData !== 'object' || gameData === null) {
			console.error('Invalid game data structure')
			return { username: '', currentGameState: false }
		}*/

		const data = Object.values(JSON.parse(historyGames)).find(
			u => (u as loadingGameHistoryProps).username === username
		) as loadingGameHistoryProps
		return data || null
	} catch (error) {
		console.error('Ошибка загрузки игровых данных пользователя: ', error)
		return null
	}
}

export const saveGameState = (username: string, gameState: loadingGameHistoryProps): void => {
	try {
		const historyGames = JSON.parse(localStorage.getItem('historyGames') || '[]')
		const index = historyGames.findIndex((game: { username: string }) => game.username === username)
		if (index !== -1) {
			historyGames[index] = { ...historyGames[index], ...gameState }
		} else {
			historyGames.push({ ...gameState, username })
		}
		localStorage.setItem('historyGames', JSON.stringify(historyGames))
	} catch (error) {
		console.error('Ошибка сохранения игровых данных пользователя: ', error)
	}
}

export const updateGameState = (username: string | undefined, gameState: loadingGameHistoryProps): void => {
	try {
		const historyGames = JSON.parse(localStorage.getItem('historyGames') as string)
		const index = historyGames.findIndex((game: loadingGameHistoryProps) => game.username === username)
		if (index !== -1) {
			historyGames[index] = { ...historyGames[index], ...gameState }
		}
		localStorage.setItem('historyGames', JSON.stringify(historyGames))
	} catch (error) {
		console.error('Ошибка обновления игровых данных пользователя: ', error)
	}
}

export const clearGameState = (username: string): void => {
	try {
		const gameData = JSON.parse(localStorage.getItem('historyGames') as string)
		const updatedGameData = gameData.filter((game: { username: string }) => game.username !== username)
		localStorage.setItem('historyGames', JSON.stringify(updatedGameData))
	} catch (error) {
		console.error('Ошибка удаления игровых данных пользователя: ', error)
	}
}
