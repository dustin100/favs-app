import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles((theme) => ({
	btn: {
		...theme.palette.typography.button,
	},
}));

const LandingPage = (props) => {
	const classes = useStyles();
	return (
		<Container maxWidth='sm'>
			<Button className={classes.btn} variant='outlined' color='secondary'>
				Sign up
			</Button>
			<Button className={classes.btn} variant='outlined' color='secondary'>
				Sign in
			</Button>
		</Container>
	);
};

export default LandingPage;
