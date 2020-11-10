import React, { Fragment } from 'react';
import Column from '../ui/Column';
import { fakeData } from '../../fakeData';
import CurrentCategory from '../ui/CurrentCategory';
import { oneStar, twoStar, threeStar } from '../../helpers';


// Pull in data from DB

// Show three columns for each category

// If category doesn't have data prompt user to add a new card

// If category has data sort into columns by rating

const CategoryPage = (props) => {
	return (
		<Fragment>
			<CurrentCategory category='Beer' />
			<div className='threeCols'>
				<Column cards={fakeData} stars={oneStar} />
				<Column cards={fakeData} stars={twoStar} />
				<Column cards={fakeData} stars={threeStar} />
			</div>
		</Fragment>
	);
};

export default CategoryPage;
