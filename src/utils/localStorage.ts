import { UserData } from '../types/auth'

export const loadDataStorage = (username: string | undefined, localItem: string): UserData | null => {
	try {
		if (!username) return null
		const usersData = JSON.parse(localStorage.getItem(localItem) as string)
		if (!usersData || typeof usersData !== 'object') return null

		const data = Object.values(usersData).find(u => (u as UserData).username === username) as UserData | undefined

		return data || null
	} catch (error) {
		console.error('Ошибка в получении данных пользвателя: ', error)
		return null
	}
}

export const updateDataStorage = (username: string | undefined, localItem: string, gameState: UserData): void => {
	try {
		const usersData = JSON.parse(localStorage.getItem(localItem) as string)
		const index = usersData.findIndex((users: UserData) => users.username === username)
		if (index !== -1) {
			usersData[index] = { ...usersData[index], ...gameState }
		}
		localStorage.setItem(localItem, JSON.stringify(usersData))
	} catch (error) {
		console.error('Ошибка в сохрнанении данных пользователя: ', error)
	}
}
