import React, { Fragment, useEffect } from 'react';
import Column from './Column';
import CategoryTitle from './CategoryTitle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { oneStar, twoStar, threeStar } from '../../helpers';
import { Grid, makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getCategory } from '../../actions/category';
import { sort } from '../../helpers';

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

const DisplayCategories = ({ cat, getCategory }) => {
	const classes = useStyles();

	useEffect(() => {
		getCategory(cat.catInfo._id);
	}, []);

	const listOne = sort(cat.catInfo.catList, 1);
	const listTwo = sort(cat.catInfo.catList, 2);
	const listThree = sort(cat.catInfo.catList, 3);

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
			<CategoryTitle category={cat.catInfo.catName} />
			<Grid
				className={classes.root}
				container
				direction='row'
				justify='center'
				spacing={2}>
				<Grid item xs={4}>
					<Column cards={listOne} stars={oneStar} />
				</Grid>
				<Grid item xs={4}>
					<Column cards={listTwo} stars={twoStar} />
				</Grid>

				<Grid item xs={4}>
					<Column cards={listThree} stars={threeStar} />
				</Grid>
			</Grid>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	cat: state.category,
});

export default connect(mapStateToProps, { getCategory })(DisplayCategories);
