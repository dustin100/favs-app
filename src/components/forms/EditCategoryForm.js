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
	FormControlLabel,
	FormControl,
	Select,
	Checkbox,
	InputLabel,
	MenuItem,
	ListItemText,
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

const CategoryForm = ({
	editCategory,
	catId,
	currentName,
	handleClose,
	filters,
	currentPublic,
	currentType,
}) => {
	const classes = useStyles();
	// const [open, setOpen] = useState(false); //for dropdown
	const [formData, setFormData] = useState({
		catName: currentName,
		catType: currentType,
		isPublic: currentPublic,
	});
	const { catName, catType, isPublic } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await editCategory(formData, catId, filters);
		handleClose();
	};

	const catTypes = [
		'foods',
		'restaurants',
		'businesses',
		'drinks',
		'products',
		'movies',
		'tv',
		'music',
		'places',
		'other',
	];

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
					<FormControl fullWidth>
						<InputLabel id='category-type-select-label'>
							Category Type
						</InputLabel>
						<Select
							labelId='category-type-select-label'
							id='category-type-controlled-open-select'
							required
							color='secondary'
							onChange={(e) => onChange(e)}
							name='catType'
							value={catType}>
							{catTypes.map((cat) => (
								<MenuItem key={cat} value={cat}>
									<ListItemText primary={cat} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControlLabel
						control={
							<Checkbox
								checked={isPublic}
								onChange={(e) => {
									setFormData({ ...formData, isPublic: !isPublic });
								}}
								name='isPublic'
								value={isPublic}
								color='secondary'
							/>
						}
						label='Make Public'
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

const mapStateToProps = (state) => ({
	filters: state.category.filters,
});

export default connect(mapStateToProps, { editCategory })(
	withRouter(CategoryForm)
);
