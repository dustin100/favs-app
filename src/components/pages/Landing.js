import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom';

// Styles
const useStyles = makeStyles((theme) => ({
	btn: {
		...theme.palette.typography.button,
	},
}));

const LandingPage = ({ isAuthenticated }) => {
	const classes = useStyles();

	if (isAuthenticated) {
		<Redirect to='/dashboard' />;
	}
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

LandingPage.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LandingPage);
