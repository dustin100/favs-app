import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(5),
	},
}));
const DisplayPagination = ({ updatePage, totalPages }) => {
	const classes = useStyles();
	const [page, setPage] = useState(1);

	const handleChange = (e, value) => {
		setPage(value);
		const skip = (value - 1) * 3;

		updatePage(skip);
	};

	return (
		<div className={classes.root}>
			
			<Pagination count={totalPages} page={page} onChange={handleChange} />
		</div>
	);
};

export default DisplayPagination;
