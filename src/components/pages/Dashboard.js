import React, { useState, useEffect, Fragment } from 'react';
import { category } from '../../fakeData';
import Spinner from '../ui/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileForm from '../forms/ProfileForm';
import { getCurrentProfile } from '../../actions/profile';
import {
	makeStyles,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	Grid,
} from '@material-ui/core';

// When user is loggedIn this is the page they are taken to

// Here they can add new categories or delete existing ones

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		marginTop: '35px',
	},
	title: {
		textTransform: 'capitalize',
	},
});

const Dashboard = ({
	getCurrentProfile,
	history,
	auth: { isAuthenticated },
	profile: { profile, loading },
}) => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [clickedCat, setClickedCat] = useState([]);

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile, isAuthenticated]);

	useEffect(() => {
		setData(category);
	}, []);

	const handleClick = (index) => {
		const listData = data[index].catList;
		setClickedCat(listData);
		history.push('/category');
	};

	const categoryList = data.map(({ catName, catList }, index) => {
		return (
			<Grid key={index} item xs={4}>
				<Card variant='outlined'>
					<CardContent>
						<Typography className={classes.title} variant='h4' component='h2'>
							{catName}
						</Typography>

						<Typography variant='body2' component='p'>
							You have {catList.length} items in this category
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							onClick={() => handleClick(index)}
							variant='outlined'
							color='secondary'
							size='small'>
							View Favs
						</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	});

	if (loading) {
		return <Spinner />;
	} else if (profile !== null) {
		return (
			<Fragment>
				<Grid
					container
					justify='flex-start'
					spacing={2}
					className={classes.root}>
					{categoryList}
				</Grid>
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<ProfileForm />
			</Fragment>
		);
	}
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
