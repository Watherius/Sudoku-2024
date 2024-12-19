export default function Registration() {
	return (
		<div>
			<h1>Registration Form</h1>
			<form>
				<label>Name:</label>
				<input type='text' name='name' required />
				<br />
				<label>Email:</label>
				<input type='email' name='email' required />
				<br />
				<label>Password:</label>
				<input type='password' name='password' required />
				<br />
				<input type='submit' value='Submit' />
			</form>
			<p>
				Already have an account? <a href='/login'>Login</a>
			</p>
		</div>
	)
}
