import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCategory } from '../actions/profile';
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

const CategoryList = ({ profile, deleteCategory }) => {
	const classes = useStyles();

	const handleClick = (index) => {
		console.log('something');
	};

	const categoryList = profile.category.map(
		({ catName, catList, _id }, index) => {
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
								onClick={() => handleClick(index)}
								variant='outlined'
								color='secondary'
								size='small'>
								View Favs
							</Button>
							<Button
								onClick={() => deleteCategory(_id)}
								variant='outlined'
								color='secondary'
								size='small'>
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
};

export default connect(null, { deleteCategory })(CategoryList);
