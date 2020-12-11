import React, { Fragment } from 'react';
import DisplayCategories from '../ui/DisplayCategories';
import { connect } from 'react-redux';

const CategoryPage = ({ cat }) => {
	if (cat.catInfo === null) {
		return (
			<Fragment>
				<p>No categories</p>{' '}
			</Fragment>
		);
	}

	return <DisplayCategories cat={cat} />;
};

const mapStateToProps = (state) => ({
	cat: state.category,
});

export default connect(mapStateToProps)(CategoryPage);
