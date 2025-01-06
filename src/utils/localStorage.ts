import { UserData } from '../types/auth'

export const loadUserDataFromStorage = (username: string | undefined): UserData | null => {
	if (!username) return null
	const usersData = JSON.parse(localStorage.getItem('usersData') as string)
	const data = Object.values(usersData).find(u => (u as UserData).username === username) as UserData | undefined
	return data ? data : null
}
