import React, { Fragment, useEffect } from 'react';
import Column from './Column';
import Spinner from './Spinner';
import CategoryTitle from './CategoryTitle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getItem } from '../../actions/item';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	container: {
		marginTop: 20,
	},
}));

const DisplayCategories = ({ cat, items, getItem }) => {
	const classes = useStyles();

	useEffect(() => {
		getItem(cat.catInfo._id);
	}, []);

	if (items.loading) {
		return <Spinner />;
	} else {
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
				<Grid container className={classes.root} direction='row' spacing={2}>
					<Column cards={items.itemInfo} />
				</Grid>
			</Fragment>
		);
	}
};

const mapStateToProps = (state) => ({
	cat: state.category,
	items: state.item,
});

export default connect(mapStateToProps, { getItem })(DisplayCategories);
