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
					<Tab className={classes.tab} label='Dashbaord'></Tab>
					<Tab className={classes.tab} label='Login'></Tab>
					<Tab className={classes.tab} label='Register'></Tab>
					<Tab className={classes.tab} label='Logout'></Tab>
					<Tab className={classes.tab} label='Category'></Tab>
				</Tabs>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

{
	/* <Button>
					<Link to='/dashboard'> Dashboard </Link>
				</Button>
				<Button>
					<Link to='/login'> Login </Link>
				</Button>
				<Button>
					<Link to='/register'> Register </Link>
				</Button>
				<Button>
					<Link to='/dashboard'> Logout </Link>
				</Button>
				<Button>
					<Link to='/category'> Category </Link>
				</Button> */
}
