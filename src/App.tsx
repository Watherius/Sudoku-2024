import { LoginForm } from './pages/LoginForm'
import MainMenu from './pages/MainMenu'

import { useAuthStore } from './store/authStore'

export default function App() {
	const user = useAuthStore(state => state.user)
	return (
		<div className='min-h-scree'>{user ? <MainMenu /> : <LoginForm />}</div>
	)
}
