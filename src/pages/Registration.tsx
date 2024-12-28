import { Button, TextField, Typography } from '@mui/material'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useAuthStore } from '../store/authStore'
import { AuthFormData } from '../types/sudoku'
import { loadUserDataFromStorage, saveUserDataToStorage } from '../utils/localStorage'
import { authSchema } from '../validations/authSchema'

export default function Registration() {
	const login = useAuthStore(state => state.login)

	const handleSubmit = async (values: AuthFormData, { setSubmitting, setErrors }: FormikHelpers<AuthFormData>) => {
		try {
			const existingUserData = await loadUserDataFromStorage(values.username)
			if (!existingUserData) {
				const newUser = {
					id: crypto.randomUUID(),
					username: values.username,
					password: values.password,
					level: 1,
					experience: 0,
					maxExperience: 500,
					currentGameState: false,
				}
				saveUserDataToStorage(values.username, newUser)
				login(newUser)
			}
			if (existingUserData) throw existingUserData
		} catch (error) {
			console.error('Error:', error + ` Пользователь ${values.username} уже существует`)
			setErrors({ username: 'Такое имя пользователя уже существует!' })
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Formik initialValues={{ username: '', password: '' }} validationSchema={authSchema} onSubmit={handleSubmit}>
			<Form className='max-w-[25rem] w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
				<Typography
					sx={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: '700' }}
					variant='h5'
					component='h1'
					gutterBottom
				>
					Регистрация
				</Typography>

				<Field name='username'>
					{({ field, meta }: FieldProps) => (
						<TextField
							{...field}
							label='Имя пользователя'
							fullWidth
							margin='normal'
							error={meta.touched && !!meta.error}
							helperText={meta.touched && meta.error}
						/>
					)}
				</Field>
				<Field name='password'>
					{({ field, meta }: FieldProps) => (
						<TextField
							{...field}
							label='Пароль'
							type='password'
							fullWidth
							margin='normal'
							error={meta.touched && !!meta.error}
							helperText={meta.touched && meta.error}
						/>
					)}
				</Field>
				<Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
					Зарегистрироваться
				</Button>
			</Form>
		</Formik>
	)
}
