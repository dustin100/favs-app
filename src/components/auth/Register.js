import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { HowToRegOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

import {
	Button,
	TextField,
	Typography,
	Container,
	Avatar,
	makeStyles,
} from '@material-ui/core';

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

export const Register = ({ setAlert, register, isAuthenticated }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		password2: '',
	});

	const [helperText, setHelperText] = useState('');

	const { email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'warning');
			setHelperText('Passwords do not match');
		} else {
			// register user with email, and password;
			register({ email, password });
			setHelperText('');
		}
	};
	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<HowToRegOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
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
						value={email}
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
						placeholder='Set Your Password'
						name='password'
						label='Password'
						minLength='6'
						margin='normal'
						onChange={(e) => onChange(e)}
						value={password}
						helperText={helperText}
					/>

					<TextField
						variant='outlined'
						required
						fullWidth
						color='secondary'
						type='password'
						placeholder='Confirm Password'
						name='password2'
						label='Confirm Password'
						minLength='6'
						margin='normal'
						onChange={(e) => onChange(e)}
						value={password2}
						helperText={helperText}
					/>

					<Button
						className={classes.submit}
						type='submit'
						color='secondary'
						variant='outlined'>
						Register
					</Button>
				</form>
				<Typography variant='subtitle1' component='p'>
					Already have an account?{' '}
					<Button color='secondary' component={Link} to='/login'>
						Sign In
					</Button>
				</Typography>
			</div>
		</Container>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
