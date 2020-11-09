import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
	return (
		<nav className='navbar'>
			<h1>
				<Link to='/'>Logo</Link>
			</h1>
			<ul>
				<li>
					<Link to='/dashboard'> Dashboard </Link>
				</li>
				<li>
					<Link to='/dashboard'> Login </Link>
				</li>
				<li>
					<Link to='/dashboard'> Logout </Link>
				</li>
				<li>
					<Link to='/category'> Category </Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
