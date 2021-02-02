import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayPagination from './pagination/DisplayPagination';
import CategoryFilter from './filters/CategoryFilter';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import {
	deleteCategory,
	getCategory,
	getPublicCategoryList,
	updatePage,
} from '../../actions/category';
import EditCategoryForm from '../forms/EditCategoryForm';
import {
	makeStyles,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	Grid,
	Popover,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '35px',
	},
	title: {
		textTransform: 'capitalize',
	},
}));

const PublicList = ({
	catInfo,
	categories: { filters, totalPages, currentPage },
	getCategory,
	getPublicCategoryList,
	updatePage,
	history,
}) => {
	const classes = useStyles()	

	const categoryList = catInfo.map(({ catName, _id, catType, isPublic }) => {
		return (
			<Grid key={_id} item xs={4}>
				<Card variant='outlined'>
					<CardContent>
						<Typography className={classes.title} variant='h4' component='h2'>
							{catName}
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							onClick={() => getCategory(_id, history)}
							variant='outlined'
							color='secondary'
							size='small'
							startIcon={<VisibilityIcon />}>
							View
						</Button>						
					</CardActions>
				</Card>
			</Grid>
		);
	});

	return (
		<Fragment>
			<CategoryFilter />
			<Grid container justify='flex-start' spacing={2} className={classes.root}>
				{categoryList}
			</Grid>
			<DisplayPagination
				filters={filters}
				totalPages={totalPages}
				getData={getPublicCategoryList}
				currentPage={currentPage}
				updatePage={updatePage}
				getCategoryList={getPublicCategoryList}
			/>
		</Fragment>
	);
};



const mapStateToProps = (state) => ({
	categories: state.category,
});

export default connect(mapStateToProps, {
	getPublicCategoryList,
	getCategory,
	updatePage,
})(withRouter(PublicList));


