import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Tab, Tabs } from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},

	titleA: {
		textDecoration: 'none',
		color: '#fff',
	},

	tab: {
		textTransform: 'capitalize',
		minWidth: 10,
		marginLeft: '25px',
	},
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
}));

const Navbar = ({ logout, auth: { loading, isAuthenticated } }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	// check url to set which nav link should be selected / highlighted
	useEffect(() => {
		if (window.location.pathname === '/dashboard' && value !== 0) {
			setValue(0);
		} else if (window.location.pathname === '/login' && value !== 0) {
			setValue(0);
		} else if (window.location.pathname === '/register' && value !== 1) {
			setValue(1);
		}
	}, [value]);

	const authLinks = (
		<Tabs value={value} onChange={handleChange}>
			<Tab
				className={classes.tab}
				component={Link}
				to='/dashboard'
				label='Dashboard'></Tab>

			<Tab
				className={classes.tab}
				component={Link}
				to='/dashboard'
				onClick={logout}
				label='Logout'></Tab>
		</Tabs>
	);

	const guestLinks = (
		<Tabs value={value} onChange={handleChange}>
			<Tab
				className={classes.tab}
				component={Link}
				to='/login'
				label='Login'
				index={0}></Tab>

			<Tab
				className={classes.tab}
				component={Link}
				to='/register'
				label='Register'
				index={1}></Tab>
		</Tabs>
	);

	return (
		<Fragment>
			<AppBar>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						<Link
							color='primary'
							className={classes.titleA}
							underlineNone
							to='/'>
							Favs App
						</Link>
					</Typography>

					{!loading && (
						<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					)}
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</Fragment>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
