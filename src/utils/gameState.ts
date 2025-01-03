import { GameState } from '../types/sudoku'

interface historyLastGamesState {
	username: string
	currentGameState: boolean
	boardGame?: GameState
	boardDifficulty?: {
		label: string
		points: number
		difficulty: number
	}
	conflicts?: string[]
}

export const loadGameState = (username: string | undefined): historyLastGamesState | null => {
	try {
		if (!username) return null

		const gameDataRaw = localStorage.getItem('historyLastGames')
		if (!gameDataRaw) {
			console.warn('No game data found in localStorage')
			return { username: '', currentGameState: false } // Значение по умолчанию для username
		}

		const gameData = JSON.parse(gameDataRaw)
		if (typeof gameData !== 'object' || gameData === null) {
			console.error('Invalid game data structure')
			return { username: '', currentGameState: false } // Значение по умолчанию для username
		}

		const data = Object.values(gameData).find(u => (u as historyLastGamesState).username === username) as
			| historyLastGamesState
			| undefined

		return data || null // Значение по умолчанию для username
	} catch (error) {
		console.error('Error loading game state:', error)
		return { username: '', currentGameState: false } // Значение по умолчанию для username
	}
}

export const saveGameState = (username: string, gameState: historyLastGamesState): void => {
	try {
		const historyLastGames = JSON.parse(localStorage.getItem('historyLastGames') || '[]')
		const existingUserIndex = historyLastGames.findIndex((game: { username: string }) => game.username === username)

		if (existingUserIndex !== -1) {
			historyLastGames[existingUserIndex] = { ...historyLastGames[existingUserIndex], ...gameState }
		} else {
			historyLastGames.push({ ...gameState, username })
		}
		localStorage.setItem('historyLastGames', JSON.stringify(historyLastGames))
	} catch (error) {
		console.error('Error saving game state:', error)
	}
}

export const updateGameState = (username: string | undefined, gameState: historyLastGamesState): void => {
	try {
		const historyLastGames = JSON.parse(localStorage.getItem('historyLastGames') as string)
		const index = historyLastGames.findIndex((game: historyLastGamesState) => game.username === username)
		if (index !== -1) {
			historyLastGames[index] = { ...historyLastGames[index], ...gameState }
		}
		localStorage.setItem('historyLastGames', JSON.stringify(historyLastGames))
	} catch (error) {
		console.error('Error saving game state:', error)
	}
}

export const clearGameState = (username: string): void => {
	try {
		const gameData = JSON.parse(localStorage.getItem('historyLastGames') as string)
		const updatedGameData = gameData.filter((game: { username: string }) => game.username !== username)
		localStorage.setItem('historyLastGames', JSON.stringify(updatedGameData))
	} catch (error) {
		console.error('Error clearing game state:', error)
	}
}
