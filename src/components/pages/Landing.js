import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
	},
}));

const LandingPage = ({ isAuthenticated }) => {
	const classes = useStyles();

	if (isAuthenticated) {
		<Redirect to='/dashboard' />;
	}
	return (
		<Container maxWidth='sm'>
			<Typography className={classes.root}>
				Some landing page content goes here
			</Typography>
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
