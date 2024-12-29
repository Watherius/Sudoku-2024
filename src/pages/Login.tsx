import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { RootState } from '../store/store'
import { LoginCredentials } from '../types/auth'
import { authSchema } from '../utils/authValidation'

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const error = useSelector((state: RootState) => state.auth.error)

	const handleSubmit = (values: LoginCredentials, { setSubmitting }: FormikHelpers<LoginCredentials>) => {
		dispatch(login(values) as any).then(() => {
			setSubmitting(false)
			if (!error) {
				navigate('/')
			}
		})
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
						Вход
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
						<Typography color='error' variant='body2' className='text-center !mt-4'>
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
						Войти
					</Button>
					<Typography variant='body2' className='text-center'>
						Нет аккаунта?{' '}
						<Link to='/register' className='text-indigo-600 hover:text-indigo-800'>
							Зарегистрироваться
						</Link>
					</Typography>
				</Form>
			)}
		</Formik>
	)
}
