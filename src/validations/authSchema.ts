import * as yup from 'yup'

export const authSchema = yup.object().shape({
	username: yup
		.string()
		.required('Имя пользователя обязательно')
		.min(3, 'Минимум 3 символа')
		.max(30, 'Максимум 30 символов'),
	password: yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
})
