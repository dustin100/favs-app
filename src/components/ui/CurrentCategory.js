import React, { Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
		padding: '.5rem',
	},
}));

const CurrentCategory = ({ category }) => {
	const classes = useStyles();
	return (
		<Typography
			className={classes.root}
			variant='h3'
			color='secondary'
			component='h2'>
			{category}
		</Typography>
	);
};

export default CurrentCategory;
