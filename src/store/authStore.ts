import { SetStateAction } from 'react'
import { create } from 'zustand'
import { User } from '../types/sudoku'
import { cleanupOldUsers, isLoginExpired } from '../utils/dateUtils'
import { Difficulty, GameState } from './../types/sudoku'

interface AuthState {
	user: User | null
	login: (user: User) => void
	logout: () => void
	stateGame: (
		isState: boolean,
		boardGame: SetStateAction<GameState>,
		difficulty: SetStateAction<Difficulty>
		//timer: number
	) => void
	updateTimer: (newTimer: number) => void
	checkLoginValidity: (username: string) => boolean
	cleanupOldUsers: () => void
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	login: user => {
		set({ user })
		localStorage.setItem('currentUsername', user.username)
		localStorage.setItem(`lastLogin_${user.username}`, Date.now().toString())
	},
	logout: () => {
		const username = localStorage.getItem('currentUsername')
		if (username) {
			localStorage.removeItem(`lastLogin_${username}`)
		}
		set({ user: null })
	},
	stateGame: (isState, boardGame, difficulty /*timer*/) => {
		set(state => {
			if (state.user) {
				const updatedUser = {
					...state.user,
					currentGameState: isState,
					currentGameData: {
						boardGame: boardGame,
						boardDifficulty: difficulty,
						//boardTimer: timer,
					},
				}
				localStorage.setItem(`user_${updatedUser.username}`, JSON.stringify(updatedUser))
				return { user: updatedUser }
			}
			return state
		})
	},
	updateTimer: (newTimer: number) => {
		set(state => {
			if (state.user && state.user.currentGameData) {
				const updatedUser = {
					...state.user,
					currentGameData: {
						...state.user.currentGameData,
						boardTimer: newTimer,
					},
				}
				localStorage.setItem(`user_${updatedUser.username}`, JSON.stringify(updatedUser))
				return { user: updatedUser }
			}
			return state
		})
	},
	checkLoginValidity: username => {
		const lastLogin = localStorage.getItem(`lastLogin_${username}`)
		return lastLogin ? !isLoginExpired(parseInt(lastLogin, 10)) : false
	},
	cleanupOldUsers: () => cleanupOldUsers(),
}))
