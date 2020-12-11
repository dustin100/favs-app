import React, { Fragment, useEffect } from 'react';
import Column from '../ui/Column';
import { category } from '../../fakeData';
import CurrentCategory from '../ui/CurrentCategory';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { oneStar, twoStar, threeStar } from '../../helpers';
import { Grid, makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	addBox: {
		minHeight: 100,
		position: 'relative',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));


const CategoryPage = ({ cat }) => {
	const classes = useStyles();

	

	if (cat.catInfo === null) {
		return (
			<Fragment>
				<p>No categories</p>{' '}
			</Fragment>
		);
	}

	

	return (
		<Fragment>
			<div className={classes.addBox}>
				<Fab
					className={classes.fab}
					component={Link}
					to='/item-form'
					variant='extended'
					color='primary'
					aria-label='add'>
					<AddIcon color='secondary' />
					Item
				</Fab>
			</div>
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
};

const mapStateToProps = (state) => ({
	cat: state.category,
});

export default connect(mapStateToProps)(CategoryPage);
