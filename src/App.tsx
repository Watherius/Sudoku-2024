import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import MainMenu from './pages/MainMenu'
import Registration from './pages/Registration'
import { store } from './store/store'

const theme = createTheme()

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box className='min-h-screen flex items-center justify-center bg-gray-100'>
				<Provider store={store}>
					<BrowserRouter>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Registration />} />
							<Route path='/' element={<MainMenu />} />
							<Route path='*' element={<Navigate to='/' replace />} />
						</Routes>
					</BrowserRouter>
				</Provider>
			</Box>
		</ThemeProvider>
	)
}
