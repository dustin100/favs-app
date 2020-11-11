import React, { useState } from 'react';
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
