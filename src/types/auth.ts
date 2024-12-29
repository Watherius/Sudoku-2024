export interface User {
	username: string
	password: string
	/*level: number
	experience: number
	maxExperience: number
	currentGameState: boolean
	currentGameData?: any*/
	//gameTimer: number
	createdAt: number
	lastLogin: number
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
