import React, { useState } from 'react';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';

import {
	Button,
	TextField,
	Typography,
	Container,
	Avatar,
	makeStyles,
	FormControl,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Radio,
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

	radioFields: {
		display: 'block',
	},

	radioButtons: {
		flexDirection: 'row',
	},

	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const ProfileForm = ({ createProfile }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		name: '',
		theme: '',
	});
	const { name, theme } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createProfile(formData);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<SettingsApplicationsIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Setup your account
				</Typography>
				<form className={classes.root} onSubmit={(e) => onSubmit(e)}>
					<TextField
						required
						fullWidth
						color='secondary'
						placeholder='Your Name'
						type='name'
						label='Name'
						onChange={(e) => onChange(e)}
						defaultValue={name}
						margin='normal'
						name='name'
						autoFocus
					/>

					<FormControl className={classes.radioFields} component='fieldset'>
						<FormLabel component='legend'>Theme</FormLabel>
						<RadioGroup
							className={classes.radioButtons}
							aria-label='theme'
							name='theme'>
							<FormControlLabel
								onChange={(e) => onChange(e)}
								value='dark'
								control={<Radio />}
								label='Dark'
								labelPlacement='top'
							/>
							<FormControlLabel
								onChange={(e) => onChange(e)}
								value='light'
								control={<Radio />}
								label='Light'
								labelPlacement='top'
							/>
						</RadioGroup>
					</FormControl>

					<Button
						className={classes.submit}
						type='submit'
						variant='outlined'
						color='secondary'>
						Next
					</Button>
				</form>
			</div>
		</Container>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(ProfileForm);
