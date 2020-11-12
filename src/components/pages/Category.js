import React, { Fragment } from 'react';
import Column from '../ui/Column';
import { fakeData } from '../../fakeData';
import CurrentCategory from '../ui/CurrentCategory';
import { oneStar, twoStar, threeStar } from '../../helpers';
import { Grid, makeStyles } from '@material-ui/core';

// Pull in data from DB

// Show three columns for each category

// If category doesn't have data prompt user to add a new card

// If category has data sort into columns by rating

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const CategoryPage = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<CurrentCategory category='Beer' />
			<Grid
				className={classes.root}
				container
				direction='row'
				justify='center'
				alignItems='center'
				spacing={2}>
				<Grid item xs={4}>
					<Column cards={fakeData} stars={oneStar} />
				</Grid>
				<Grid item xs={4}>
					<Column cards={fakeData} stars={twoStar} />
				</Grid>

				<Grid item xs={4}>
					<Column cards={fakeData} stars={threeStar} />
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default CategoryPage;
