import { useEffect } from 'react'
import MainMenu from './pages/MainMenu'

import { Box } from '@mui/material'
import Registration from './pages/Registration'
import { useAuthStore } from './store/authStore'
import { loadUserDataFromStorage } from './utils/localStorage'

export default function App() {
	const user = useAuthStore(state => state.user)
	const login = useAuthStore(state => state.login)
	const checkLoginValidity = useAuthStore(state => state.checkLoginValidity)
	const cleanupOldUsers = useAuthStore(state => state.cleanupOldUsers)

	useEffect(() => {
		cleanupOldUsers()

		const username = localStorage.getItem('currentUsername')

		if (username) {
			const isValid = checkLoginValidity(username)

			if (isValid) {
				const userData = loadUserDataFromStorage(username)
				if (userData) {
					login(userData)
				}
			} else {
				localStorage.removeItem('currentUsername')
			}
		}
	}, [checkLoginValidity, cleanupOldUsers, login])

	return (
		<Box className='min-h-screen flex items-center justify-center bg-gray-100'>
			{/*<Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>*/}
			{user ? <MainMenu /> : <Registration />}
		</Box>
	)
}
