import React, { Fragment, useEffect } from 'react';
import Column from './Column';
import CategoryTitle from './CategoryTitle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { oneStar, twoStar, threeStar } from '../../helpers';
import { Grid, makeStyles, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getCategory } from '../../actions/category';
import { sort } from '../../helpers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	container: {
		marginTop: 20,
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
			<Grid container justify='space-between' className={classes.container}>
				<Tooltip title='Back To Categories' arrow>
					<Fab
						className={classes.fab}
						component={Link}
						to='/dashboard'
						variant='round'
						color='primary'
						aria-label='add'>
						<ArrowBackIcon color='secondary' />
					</Fab>
				</Tooltip>
				<Tooltip title='Add' arrow>
					<Fab
						className={classes.fab}
						component={Link}
						to='/item-form'
						variant='round'
						color='primary'
						aria-label='add'>
						<AddIcon color='secondary' />
					</Fab>
				</Tooltip>
			</Grid>
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
