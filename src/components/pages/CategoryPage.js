import React from 'react';
import Column from '../ui/Column';
import { fakeData } from '../../fakeData';
import CurrentCategory from '../ui/CurrentCategory';

// Pull in data from DB

// Show three columns for each category

// If category doesn't have data prompt user to add a new card

// If category has data sort into columns by rating

const CategoryPage = (props) => {
	return (
		<div>
			<CurrentCategory category='Beer'/>
			<Column cards={fakeData} />
			<Column cards={fakeData} />
			<Column cards={fakeData} />
		</div>
	);
};

export default CategoryPage;
