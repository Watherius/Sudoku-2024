import * as Yup from 'yup'

export const authSchema = Yup.object().shape({
	username: Yup.string()
		.required('Имя пользователя обязательно')
		.min(3, 'Минимум 3 символа')
		.max(30, 'Максимум 30 символов'),
	password: Yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
})
