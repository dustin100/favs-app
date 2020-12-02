import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '80%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
		margin: 'auto',
	},
}));

export default function LinearIndeterminate() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<LinearProgress color='secondary' />
			<LinearProgress color='secondary' />
		</div>
	);
}
