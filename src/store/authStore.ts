import { create } from 'zustand'
import { User } from '../types/sudoku'

interface AuthState {
	user: User | null
	login: (user: User) => void
	logout: () => void
	loadUserData: (username: string) => User | null
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	login: user => set({ user }),
	logout: () => set({ user: null }),
	loadUserData: (username: string) => {
		const savedData = localStorage.getItem(`user_${username}`)
		if (savedData) {
			return JSON.parse(savedData) as User
		}
		return null
	},
}))
