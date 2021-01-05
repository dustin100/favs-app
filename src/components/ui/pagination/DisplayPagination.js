import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { getCategoryList } from '../../../actions/category';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));
const DisplayPagination = ({ getCategoryList, totalPages }) => {
	const classes = useStyles();
	const [page, setPage] = useState(1);

	const handleChange = (e, value) => {
		setPage(value);
		const skip = (value - 1) * 3;

		getCategoryList(skip);
	};

	return (
		<div className={classes.root}>
			<Typography>Page: {page}</Typography>
			<Pagination count={totalPages} page={page} onChange={handleChange} />
		</div>
	);
};

export default connect(null, { getCategoryList })(DisplayPagination);
