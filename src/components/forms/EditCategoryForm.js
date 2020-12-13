import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editCategory } from '../../actions/category';

import {
	Button,
	TextField,
	Container,
	makeStyles,
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

const CategoryForm = ({ editCategory, catId, currentName, handleClose }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		catName: '',
	});
	const { catName } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await editCategory(formData, catId);
		handleClose();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Typography variant='h5'>Edit Name</Typography>
				<form className={classes.root} onSubmit={(e) => onSubmit(e)}>
					<TextField
						required
						fullWidth
						color='secondary'
						placeholder='Category Name'
						type='name'
						label='Name'
						onChange={(e) => onChange(e)}
						defaultValue={catName}
						margin='normal'
						name='catName'
						autoFocus
					/>

					<Button
						className={classes.submit}
						type='submit'
						variant='outlined'
						color='secondary'>
						Update
					</Button>
				</form>
			</div>
		</Container>
	);
};

CategoryForm.propTypes = {
	editCategory: PropTypes.func.isRequired,
};

export default connect(null, { editCategory })(withRouter(CategoryForm));
