import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCategory, getCategory } from '../actions/category';
import {
	makeStyles,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	Grid,
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

const CategoryList = ({ profile, deleteCategory, getCategory, history }) => {
	const classes = useStyles();

	const categoryList = profile.categories.map(
		({ catName, catList = [], _id }) => {
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
								onClick={() => getCategory(_id, history)}
								color='secondary'
								size='small'
								variant='outlined'
								startIcon={<EditIcon />}>
								Edit
							</Button>
							<Button
								onClick={() => deleteCategory(_id)}
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
		}
	);

	return (
		<Fragment>
			<Grid container justify='flex-start' spacing={2} className={classes.root}>
				{categoryList}
			</Grid>
		</Fragment>
	);
};

CategoryList.propTypes = {
	deleteCategory: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, getCategory })(
	withRouter(CategoryList)
);
