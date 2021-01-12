import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterCategoryList, getCategoryList } from '../../../actions/category';
import {
	FormControl,
	Select,
	MenuItem,
	ListItemText,
	InputLabel,
	makeStyles,
	Button,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
	},

	form: {
		display: 'flex',
		alignItems: 'center',
	},

	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const CategoryFilters = ({ catState, filterCategoryList, getCategoryList }) => {
	const classes = useStyles();
	const [dateFilter, setDateFilter] = useState(catState.filters.sortBy);
	const [typeFilter, setTypeFilter] = useState(catState.filters.catType);
	const [publicFilter, setPublicFilter] = useState(catState.filters.isPublic);

	const onSubmit = (e) => {
		e.preventDefault();
		const params = {
			limit: 3,
			sortBy: dateFilter,
		};

		if (publicFilter !== 'all') {
			params.isPublic = publicFilter;
		}

		if (typeFilter !== 'all') {
			params.catType = typeFilter;
		}

		filterCategoryList(params);
	};

	const catTypes = [
		'all',
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
		<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
			<FormControl className={classes.formControl}>
				<InputLabel id='category-type-select-label'>Category Type</InputLabel>
				<Select
					labelId='category-type-select-label'
					id='category-type'
					color='secondary'
					onChange={(e) => setTypeFilter(e.target.value)}
					name='catType'
					value={typeFilter}>
					{catTypes.map((cat) => (
						<MenuItem key={cat} value={cat} name={cat}>
							<ListItemText primary={cat} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id='category-date-select-label'>Date</InputLabel>
				<Select
					labelId='category-date-select-label'
					id='category-date'
					color='secondary'
					onChange={(e) => setDateFilter(e.target.value)}
					value={dateFilter}>
					<MenuItem name='createdAt:desc' value='createdAt:desc'>
						newest to oldest
					</MenuItem>
					<MenuItem name='createdAt:asc' value='createdAt:asc'>
						oldest to newest
					</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id='public-select-label'>Public</InputLabel>
				<Select
					labelId='public-select-label'
					id='public'
					color='secondary'
					onChange={(e) => setPublicFilter(e.target.value)}
					name='isPublic'
					value={publicFilter}>
					<MenuItem name='all' value='all'>
						All
					</MenuItem>
					<MenuItem name='public' value='true'>
						Show Public Only
					</MenuItem>
					<MenuItem name='private' value='false'>
						Show Private Only
					</MenuItem>
				</Select>
			</FormControl>
			<Button
				className={classes.submit}
				type='submit'
				variant='outlined'
				color='secondary'>
				Filter
			</Button>
		</form>
	);
};
const mapStateToProps = (state) => ({
	catState: state.category,
});
export default connect(mapStateToProps, {
	filterCategoryList,
	getCategoryList,
})(CategoryFilters);
