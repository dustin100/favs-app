import React, { useEffect, Fragment } from 'react';
import Spinner from '../ui/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPublicCategoryList } from '../../actions/category';
import PublicList from '../ui/PublicList';
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
const Public = ({ getPublicCategoryList, categories }) => {
	const classes = useStyles();

	useEffect(() => {
		getPublicCategoryList(categories.filters);
	}, [getPublicCategoryList, categories.filters]);

	return (
		<Fragment>
			{categories.catInfo.length ? (
				<PublicList catInfo={categories.catInfo} />
			) : (
				<p>Get started by adding some categories</p>
			)}
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	categories: state.category,
});
export default connect(mapStateToProps, { getPublicCategoryList })(Public);
