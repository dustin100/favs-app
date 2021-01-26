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
	getCategoryList,
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

const CategoryList = ({
	catInfo,
	categories: { filters, totalPages, currentPage },
	deleteCategory,
	getCategory,
	getCategoryList,
	updatePage,
	history,
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [currentId, setCurrentId] = useState(null);
	const [currentPublic, setCurrentPublic] = useState(null);
	const [currentType, setCurrentType] = useState(null);

	const handleClick = (event, name, id, catType, isPublic) => {
		setAnchorEl(event.currentTarget);
		setCurrentName(name);
		setCurrentId(id);
		setCurrentType(catType);
		setCurrentPublic(isPublic);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const edit = open ? 'simple-popover' : undefined;

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

						<Button
							color='secondary'
							size='small'
							variant='outlined'
							aria-describedby={edit}
							onClick={(e) => handleClick(e, catName, _id, catType, isPublic)}
							startIcon={<EditIcon />}>
							Edit
						</Button>
						<Popover
							id={edit}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}>
							<EditCategoryForm
								currentName={currentName}
								catId={currentId}
								handleClose={handleClose}
								currentPublic={currentPublic}
								currentType={currentType}
							/>
						</Popover>
						<Button
							onClick={() => deleteCategory(_id, filters)}
							variant='outlined'
							color='secondary'
							size='small'
							startIcon={<DeleteIcon />}>
							Delete
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
				getData={getCategoryList}
				currentPage={currentPage}
				updatePage={updatePage}
				getCategoryList={getCategoryList}
			/>
		</Fragment>
	);
};

CategoryList.propTypes = {
	deleteCategory: PropTypes.func.isRequired,
	getCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	categories: state.category,
});

export default connect(mapStateToProps, {
	getCategoryList,
	deleteCategory,
	getCategory,
	updatePage,
})(withRouter(CategoryList));
