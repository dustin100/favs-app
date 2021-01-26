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
	FormControl,
	Select,
	MenuItem,
	ListItemText,
	InputLabel,
	FormControlLabel,
	Checkbox,
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
	const [open, setOpen] = useState(false); //for dropdown
	const [formData, setFormData] = useState({
		catName: '',
		catType: '',
		isPublic: true,
	});

	const { catName, catType, isPublic } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createCategory(formData, history);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
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
							open={open}
							value={catType}
							onClose={handleClose}
							onOpen={handleOpen}>
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
