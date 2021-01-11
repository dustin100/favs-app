import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(5),
	},
}));
const DisplayPagination = ({
	updatePage,
	totalPages,
	catId,
	currentPage,
	filters,
	getCategoryList,
}) => {
	const classes = useStyles();

	const handleChange = (e, value) => {
		const page = {
			number: value,
			skip: (value - 1) * 3,
			limit: 3,
		};
		updatePage(page);

		console.log({ ...filters, ...page });
		getCategoryList({ ...filters, ...page });
	};

	return (
		<div className={classes.root}>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={handleChange}
			/>
		</div>
	);
};

export default DisplayPagination;
