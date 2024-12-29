import bcrypt from 'bcryptjs-react'

export const encrypt = (password: string): string => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(password, salt)
}

export const isValidPassword = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash)
}
