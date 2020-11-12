import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
	Button,
	TextField,
	Typography,
	Container,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import Register from './Register';

// Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					<TextField
						variant='outlined'
						required
						fullWidth
						color='secondary'
						placeholder='Enter Your Email'
						type='email'
						label='Email'
						onChange={(e) => onChange(e)}
						defaultValue={email}
						margin='normal'
						name='email'
						autoFocus
					/>

					<TextField
						variant='outlined'
						required
						fullWidth
						color='secondary'
						type='password'
						placeholder='Enter Your Password'
						name='password'
						label='Password'
						minLength='6'
						onChange={(e) => onChange(e)}
						value={password}
					/>

					<Button
						className={classes.submit}
						type='submit'
						variant='outlined'
						color='secondary'>
						Login
					</Button>
				</form>
				<Typography variant='subtitle1' component='p'>
					Don't have an account?{' '}
					<Button color='secondary' component={Link} to='/register'>
						Sign up
					</Button>
				</Typography>
			</div>
		</Container>
	);
};

export default Login;
