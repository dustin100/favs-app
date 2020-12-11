import React, { Fragment, useEffect } from 'react';
import Column from '../ui/Column';
import { category } from '../../fakeData';
import CurrentCategory from '../ui/CurrentCategory';
import { connect } from 'react-redux';
import { oneStar, twoStar, threeStar } from '../../helpers';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const CategoryPage = ({ cat }) => {
	const classes = useStyles();

	useEffect(() => {
		console.log(cat);
	});
	if (cat.catInfo === null) {
		return (
			<Fragment>
				<p>No categories created</p>{' '}
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<CurrentCategory category={cat.catInfo.catName} />
				<Grid
					className={classes.root}
					container
					direction='row'
					justify='center'
					spacing={2}>
					<Grid item xs={4}>
						<Column cards={cat.catInfo.catList} stars={oneStar} />
					</Grid>
					<Grid item xs={4}>
						<Column cards={category[0].catList} stars={twoStar} />
					</Grid>

					<Grid item xs={4}>
						<Column cards={category[0].catList} stars={threeStar} />
					</Grid>
				</Grid>
			</Fragment>
		);
	}
};

const mapStateToProps = (state) => ({
	cat: state.category,
});

export default connect(mapStateToProps)(CategoryPage);
