export interface User {
	id: string
	username: string
	password: string
	createdAt: number
	lastLogin: number
}

export interface UserData {
	id: string
	username: string
	level: number
	experience: number
	currentGameState: boolean
}

export interface AuthState {
	user: User | null
	isAuthenticated: boolean
	error: string | null
}

export interface LoginCredentials {
	username: string
	password: string
}
