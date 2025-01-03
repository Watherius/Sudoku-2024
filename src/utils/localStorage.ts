import { User, UserData } from '../types/auth'

/*export const loadUserDataFromStorage = (username: string): User | null => {
	const userData = localStorage.getItem(username)
	return userData ? (JSON.parse(userData) as User) : null
}*/

export const loadUserDataFromStorage = (username: string | undefined): UserData | null => {
	if (!username) return null
	const usersData = JSON.parse(localStorage.getItem('usersData') as string)
	//const data = usersData.find((u: UserData) => u.username === username)
	const data = Object.values(usersData).find(u => (u as UserData).username === username) as UserData | undefined
	return data ? data : null
}

export const saveUserDataToStorage = (username: string, user: User): void => {
	localStorage.setItem(`user_${username}`, JSON.stringify(user))
	localStorage.setItem(`lastLogin_${username}`, Date.now().toString())
}

export const deleteUserFromStorage = (username: string): void => {
	localStorage.removeItem(`user_${username}`)
	localStorage.removeItem(`lastLogin_${username}`)
}
