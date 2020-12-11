import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addItem } from '../../actions/item';
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

const ItemForm = ({ addItem, history, catState: { catInfo } }) => {
	const classes = useStyles();
	const [rating, setRating] = useState(0);

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
		const currentCat = catInfo._id;
		addItem(formData, rating, history, currentCat);
	};

	if (catInfo === null) {
		return (
			<Fragment>
				<p>No category selected</p>
			</Fragment>
		);
	}

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
	addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	catState: state.category,
});
export default connect(mapStateToProps, { addItem })(withRouter(ItemForm));
