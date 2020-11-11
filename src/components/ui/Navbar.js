import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	return (
		<AppBar>
			<Toolbar>
				<Typography variant='h6' className={classes.title}>
					<Link to='/'>Logo</Link>
				</Typography>

				<Button>
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
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
