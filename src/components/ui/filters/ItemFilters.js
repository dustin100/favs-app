import React, { useState } from 'react';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { filterItemList, getItem } from '../../../actions/item';
import {
	FormControl,
	Select,
	MenuItem,
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

const ItemFilters = ({ items, filterItemList, getItem }) => {
	const classes = useStyles();
	const [dateFilter, setDateFilter] = useState(items.filters.sortBy);
	const [ratingFilter, setRatingFilter] = useState(items.filters.rating);

	const onSubmit = (e) => {
		e.preventDefault();
		const params = {
			limit: 3,
			sortBy: dateFilter,
		};

		if (ratingFilter !== 'all') {
			params.rating = ratingFilter;
		}

		filterItemList(params);
	};

	return (
		<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
			<FormControl className={classes.formControl}>
				<InputLabel id='category-type-select-label'>Rating</InputLabel>
				<Select
					labelId='category-type-select-label'
					id='category-type'
					color='secondary'
					onChange={(e) => setRatingFilter(e.target.value)}
					name='catType'
					value={ratingFilter}>
					<MenuItem value='all' name='all '>
						All
					</MenuItem>
					<MenuItem value={1} name={1}>
						<Rating name='rating-filter' value={1} readOnly />
					</MenuItem>
					<MenuItem value={2} name={2}>
						<Rating name='rating-filter' value={2} readOnly />
					</MenuItem>
					<MenuItem value={3} name={3}>
						<Rating name='rating-filter' value={3} readOnly />
					</MenuItem>
					<MenuItem value={4} name={4}>
						<Rating name='rating-filter' value={4} readOnly />
					</MenuItem>
					<MenuItem value={5} name={5}>
						<Rating name='rating-filter' value={5} readOnly />
					</MenuItem>
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
	items: state.item,
});
export default connect(mapStateToProps, {
	filterItemList,
	getItem,
})(ItemFilters);
