import React, { Fragment } from 'react';

const CurrentCategory = ({ category }) => {
	return (
		<Fragment>
			<h2 className='currentCatTitle'>{category}</h2>
		</Fragment>
	);
};

export default CurrentCategory;
