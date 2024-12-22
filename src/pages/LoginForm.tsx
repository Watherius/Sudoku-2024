import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import {
	loadUserDataFromStorage,
	saveUserDataToStorage,
} from '../utils/localStorage'

export const LoginForm: React.FC = () => {
	const [username, setUsername] = useState('')
	const login = useAuthStore(state => state.login)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const existingUserData = loadUserDataFromStorage(username)

		if (existingUserData) {
			saveUserDataToStorage(username, existingUserData) // Обновляем время входа
			login(existingUserData)
		} else {
			const newUser = {
				id: crypto.randomUUID(),
				username,
				level: 1,
				experience: 0,
				maxExperience: 500,
				currentGameState: false,
			}
			saveUserDataToStorage(username, newUser)
			login(newUser)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Вход в Sudoku
					</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className=''>
						<div className='rounded-md shadow-sm space-y-4'>
							<label htmlFor='username' className='sr-only'>
								Имя пользователя
							</label>
							<input
								id='username'
								name='username'
								type='text'
								required
								value={username}
								onChange={e => setUsername(e.target.value)}
								className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
								placeholder='Имя пользователя'
							/>
						</div>
						<p className='text-gray-500 opacity-80 italic text-[0.8rem] mt-4'>
							* Введенное имя будет использоваться как профиль, не забудьте его.
						</p>
					</div>

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
						>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
