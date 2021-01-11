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
	currentPage,
	filters,
	getCategoryList,
}) => {
	const classes = useStyles();

	const handleChange = (e, value) => {
		const page = {
			currentPage: value,
			skip: (value - 1) * 3,
			limit: 3,
		};
		updatePage(page);
		getCategoryList({ ...filters, ...page });
	};

	// hides pagination controls
	if (currentPage < 1) {
		return;
	}

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
