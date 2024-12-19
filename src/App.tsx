import { LoginForm } from './components/LoginForm'
import { SudokuMain } from './components/SudokuMain'
import { useAuthStore } from './store/authStore'

export default function App() {
	const user = useAuthStore(state => state.user)
	return (
		<div className='min-h-screen bg-gray-100'>
			{user ? <SudokuMain /> : <LoginForm />}
		</div>
	)
}
