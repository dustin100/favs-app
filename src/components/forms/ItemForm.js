import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createCategory } from '../../actions/category';
import Rating from '@material-ui/lab/Rating';

import {
	Button,
	TextField,
	Container,
	makeStyles,
	Box,
	Typography,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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

const ItemForm = ({ createCategory, history }) => {
	const classes = useStyles();
	const [rating, setRating] = useState(2);

	const [formData, setFormData] = useState({
		name: null,
		notes: '',
	});
	const { name, notes } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createCategory(formData, rating, history);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Box component='fieldset' mb={3} borderColor='transparent'>
					<Typography component='legend'>Rating</Typography>
					<Rating
						name='simple-controlled'
						color='secondary'
						defaultValue={0}
						size='large'
						max={3}
						value={rating}
						onChange={(event, newValue) => {
							setRating(newValue);
						}}
					/>
				</Box>
				<form className={classes.root} onSubmit={(e) => onSubmit(e)}>
					<TextField
						required
						fullWidth
						color='secondary'
						placeholder='Item Name'
						type='name'
						label='Name'
						onChange={(e) => onChange(e)}
						defaultValue={name}
						margin='normal'
						name='name'
						autoFocus
					/>

					<TextField
						fullWidth
						multiline
						rowsmin={4}
						color='secondary'
						placeholder='notes'
						type='note'
						label='Notes'
						onChange={(e) => onChange(e)}
						defaultValue={notes}
						margin='normal'
						name='note'
						variant='filled'
					/>

					<Button
						className={classes.submit}
						type='submit'
						variant='outlined'
						color='secondary'>
						Add
					</Button>
				</form>
			</div>
		</Container>
	);
};

ItemForm.propTypes = {
	createCategory: PropTypes.func.isRequired,
};

export default connect(null, { createCategory })(withRouter(ItemForm));
