import React, { useEffect, Fragment } from 'react';
import Spinner from '../ui/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategoryList, deleteCategory } from '../../actions/category';
import CategoryList from '../ui/CategoryList';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Fab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '35px',
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

const Dashboard = ({ getCategoryList, categories, auth }) => {
	const classes = useStyles();

	useEffect(() => {
		getCategoryList(categories.filters);
	}, [getCategoryList, auth.isAuthenticated, categories.filters]);

	if (auth.loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div className={classes.addBox}>
					<Fab
						className={classes.fab}
						component={Link}
						to='/categoryform'
						variant='extended'
						color='primary'
						aria-label='add'>
						<AddIcon color='secondary' />
						Category
					</Fab>
				</div>
				{categories.catInfo.length ? (
					<CategoryList catInfo={categories.catInfo} />
				) : (
					<p>Get started by adding some categories</p>
				)}
			</Fragment>
		);
	}
};

Dashboard.propTypes = {
	categories: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	categories: state.category,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCategoryList, deleteCategory })(
	Dashboard
);
