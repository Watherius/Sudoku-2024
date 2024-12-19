import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export const LoginForm: React.FC = () => {
	const [username, setUsername] = useState('')
	const login = useAuthStore(state => state.login)
	const loadUserData = useAuthStore(state => state.loadUserData)

	const handleSubmit = () => {
		const existingUserData = loadUserData(username)
		if (existingUserData) {
			login(existingUserData)
		} else {
			const newUser = {
				id: crypto.randomUUID(),
				username,
				level: 1,
				experience: 0,
				maxExperience: 500,
				gameInProgress: false,
			}
			localStorage.setItem(`user_${username}`, JSON.stringify(newUser))
			login(newUser)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Добро пожаловать в Sudoku!
					</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='rounded-md shadow-sm space-y-4'>
						<div>
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
