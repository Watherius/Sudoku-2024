const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_MONTH = 30 * ONE_DAY

export const isLoginExpired = (lastLogin: number): boolean => {
	return Date.now() - lastLogin > ONE_DAY
}

export const cleanupOldUsers = (): void => {
	const now = Date.now()
	for (const key in localStorage) {
		if (key.startsWith('lastLogin_')) {
			const lastLogin = parseInt(localStorage.getItem(key) || '0', 10)
			if (now - lastLogin > ONE_MONTH) {
				const username = key.replace('lastLogin_', '')
				localStorage.removeItem(key)
				localStorage.removeItem(`user_${username}`)
			}
		}
	}
}
