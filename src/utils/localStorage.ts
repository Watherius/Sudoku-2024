import { User } from '../types/auth'

export const loadUserDataFromStorage = (username: string): User | null => {
	const userData = localStorage.getItem(username)
	return userData ? (JSON.parse(userData) as User) : null
}

export const saveUserDataToStorage = (username: string, user: User): void => {
	localStorage.setItem(`user_${username}`, JSON.stringify(user))
	localStorage.setItem(`lastLogin_${username}`, Date.now().toString())
}

export const deleteUserFromStorage = (username: string): void => {
	localStorage.removeItem(`user_${username}`)
	localStorage.removeItem(`lastLogin_${username}`)
}
