import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearError, register } from '../store/authSlice'
import { AppDispatch, RootState } from '../store/store'
import { LoginCredentials } from '../types/auth'
import { authSchema } from '../utils/authValidation'

export default function Registration() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const error = useSelector((state: RootState) => state.auth.error)

	useEffect(() => {
		dispatch(clearError())
	}, [dispatch])

	const handleSubmit = async (values: LoginCredentials, { setSubmitting }: FormikHelpers<LoginCredentials>) => {
		try {
			const successRegistration = (await dispatch(register(values))) as boolean
			setSubmitting(false)

			if (successRegistration) {
				setTimeout(() => {
					navigate('/')
				}, 1500)
			}
		} catch (error) {
			console.error('Ошибка регистрации:', error)
			setSubmitting(false)
		}
	}

	return (
		<Formik initialValues={{ username: '', password: '' }} validationSchema={authSchema} onSubmit={handleSubmit}>
			{({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
				<Form className='max-w-[25rem] w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
					<Typography
						sx={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: '700' }}
						variant='h5'
						component='h1'
						gutterBottom
					>
						Регистрация
					</Typography>

					<TextField
						fullWidth
						name='username'
						label='Логин'
						value={values.username}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.username && Boolean(errors.username)}
						helperText={touched.username && errors.username}
					/>

					<TextField
						fullWidth
						name='password'
						type='password'
						label='Пароль'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
					/>

					{error && (
						<Typography color='error' variant='body2' className='text-center'>
							{error}
						</Typography>
					)}

					<Button
						fullWidth
						type='submit'
						variant='contained'
						disabled={isSubmitting}
						className='bg-indigo-600 hover:bg-indigo-700'
					>
						Регистрация
					</Button>

					<Typography variant='body2' className='text-center'>
						Уже есть аккаунт?{' '}
						<Link to='/login' className='text-indigo-600 hover:text-indigo-800'>
							Войти
						</Link>
					</Typography>
				</Form>
			)}
		</Formik>
	)
}
