import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { createCategory } from '../../actions/category';

import {
	Button,
	TextField,
	Container,
	makeStyles,
	Grid,
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

const CategoryForm = ({ createCategory, history }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		catName: '',
		catType: '',
	});
	const { catName, catType } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createCategory(formData, history);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
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
					<TextField
						required
						fullWidth
						color='secondary'
						placeholder='Category Type'
						type='type'
						label='Type'
						onChange={(e) => onChange(e)}
						defaultValue={catType}
						margin='normal'
						name='catType'
					/>
					<Grid container justify='space-between'>
						<Button
							className={classes.submit}
							type='submit'
							variant='outlined'
							color='secondary'>
							Create
						</Button>
						<Button
							className={classes.submit}
							component={Link}
							to={'/dashboard'}
							variant='outlined'
							color='secondary'>
							Cancel
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

CategoryForm.propTypes = {
	createCategory: PropTypes.func.isRequired,
};

export default connect(null, { createCategory })(withRouter(CategoryForm));
