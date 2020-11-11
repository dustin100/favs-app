import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Tab,
	Tabs,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},

	tab: {
		textTransform: 'capitalize',
		minWidth: 10,
		marginLeft: '25px',
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	useEffect(() => {
		if (window.location.pathname === '/dashboard' && value !== 0) {
			setValue(0);
		} else if (window.location.pathname === '/login' && value !== 1) {
			setValue(1);
		} else if (window.location.pathname === '/register' && value !== 2) {
			setValue(2);
		} else if (window.location.pathname === '/logout' && value !== 3) {
			setValue(3);
		} else if (window.location.pathname === '/category' && value !== 4) {
			setValue(4);
		}
	}, [value]);

	return (
		<AppBar>
			<Toolbar>
				<Typography variant='h6' className={classes.title}>
					<Link to='/'>Logo</Link>
				</Typography>
				<Tabs value={value} onChange={handleChange}>
					<Tab
						className={classes.tab}
						component={Link}
						to='/dashboard'
						label='Dashboard'></Tab>
					<Tab
						className={classes.tab}
						component={Link}
						to='/login'
						label='Login'></Tab>
					<Tab
						className={classes.tab}
						component={Link}
						to='/register'
						label='Register'></Tab>
					<Tab
						className={classes.tab}
						component={Link}
						to='/dashboard'
						label='Logout'></Tab>
					<Tab
						className={classes.tab}
						component={Link}
						to='/category'
						label='Category'></Tab>
				</Tabs>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
