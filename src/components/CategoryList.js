import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayPagination from './ui/pagination/DisplayPagination';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCategory, getCategory } from '../actions/category';
import EditCategoryForm from './forms/EditCategoryForm';
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
	offset,
	totalPages,
	deleteCategory,
	getCategory,
	history,
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [currentId, setCurrentId] = useState(null);

	const handleClick = (event, name, id) => {
		setAnchorEl(event.currentTarget);
		setCurrentName(name);
		setCurrentId(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const edit = open ? 'simple-popover' : undefined;

	const categoryList = catInfo.map(({ catName, catList = [], _id }) => {
		return (
			<Grid key={_id} item xs={4}>
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
							onClick={(e) => handleClick(e, catName, _id)}
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
							/>
						</Popover>
						<Button
							onClick={() => deleteCategory(_id, offset)}
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
			<Grid container justify='flex-start' spacing={2} className={classes.root}>
				{categoryList}
			</Grid>
			<DisplayPagination offset={offset} totalPages={totalPages} />
		</Fragment>
	);
};

CategoryList.propTypes = {
	deleteCategory: PropTypes.func.isRequired,
	getCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, getCategory })(
	withRouter(CategoryList)
);
