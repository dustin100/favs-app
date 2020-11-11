import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles((theme) => ({
	btn: {
		width: '385px'
	},
}));

const Login = (props) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		// pass email and password to backend
	};

	return (
		<section className='login'>
			<h1>Sign In</h1>
			<p>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						onChange={(e) => onChange(e)}
						value={password}
					/>
				</div>

				<Button
					className={classes.btn}
					variant='outlined'
					color='secondary'
					type='submit'
					value='Login'>
					Login
				</Button>
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign up</Link>
			</p>
		</section>
	);
};

export default Login;
