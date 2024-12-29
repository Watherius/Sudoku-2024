import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, LoginCredentials, User } from '../types/auth'
import { encrypt, isValidPassword } from '../utils/authEncryption'
import { AppDispatch } from './store'

const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000
const DAY_IN_MS = 24 * 60 * 60 * 1000

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.user = action.payload
			state.isAuthenticated = true
			state.error = null
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.user = null
			state.isAuthenticated = false
			state.error = action.payload
		},
		logout: state => {
			state.user = null
			state.isAuthenticated = false
			state.error = null
		},
		clearError: state => {
			state.error = null
		},
	},
})

export const { loginSuccess, loginFailure, logout, clearError } = authSlice.actions

export const login = (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
	try {
		const users = JSON.parse(localStorage.getItem('users') || '[]')
		const user = users.find((u: User) => u.username === credentials.username)

		if (!user || !isValidPassword(credentials.password, user.password)) {
			dispatch(loginFailure('Неверный логин или пароль'))
			return
		}

		const now = Date.now()
		if (now - user.lastLogin > MONTH_IN_MS) {
			const updatedUsers = users.filter((u: User) => u.username !== user.username)
			localStorage.setItem('users', JSON.stringify(updatedUsers))
			dispatch(loginFailure('Срок действия аккаунта истек. Пожалуйста, зарегистрируйтесь снова.'))
			return
		}

		const updatedUser = { ...user, lastLogin: now }
		const updatedUsers = users.map((u: User) => (u.username === user.username ? updatedUser : u))
		localStorage.setItem('users', JSON.stringify(updatedUsers))
		dispatch(loginSuccess(updatedUser))

		// Срок сессии
		setTimeout(() => {
			dispatch(logout())
		}, DAY_IN_MS)
	} catch (error) {
		console.error('Login Error:', error)
		dispatch(loginFailure('Ошибка входа!'))
	}
}

export const register = (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
	try {
		const users = JSON.parse(localStorage.getItem('users') || '[]')

		if (users.some((u: User) => u.username === credentials.username)) {
			dispatch(loginFailure('Такой логин уже существует'))
			return
		}

		const newUser: User = {
			username: credentials.username,
			password: encrypt(credentials.password),
			createdAt: Date.now(),
			lastLogin: Date.now(),
		}

		users.push(newUser)
		localStorage.setItem('users', JSON.stringify(users))
		dispatch(loginSuccess(newUser))

		// Срок сессии
		setTimeout(() => {
			dispatch(logout())
		}, DAY_IN_MS)
		return true
	} catch (error) {
		console.error('Registration Error:', error)
		dispatch(loginFailure('Ошибка регистрации!'))
		return false
	}
}

export default authSlice.reducer
