import { UserData } from '../types/auth'
import { calculateNewLevel } from '../utils/levelSystem'

export const updateUserProgress = (username: string, experienceGained: number): void => {
	try {
		const usersData: UserData[] = JSON.parse(localStorage.getItem('usersData') || '[]')
		const userIndex = usersData.findIndex(u => u.username === username)

		if (userIndex === -1) return

		const userData = usersData[userIndex]
		const newExperience = userData.experience + experienceGained
		const newLevel = calculateNewLevel(newExperience)

		usersData[userIndex] = {
			...userData,
			level: newLevel,
			experience: newExperience,
		}

		localStorage.setItem('usersData', JSON.stringify(usersData))
	} catch (error) {
		console.error('Ошибка обновления прогресса пользователя:', error)
	}
}
