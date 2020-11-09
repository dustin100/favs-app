import React from 'react';

const Card = ({ name, rating, notes }) => {
	return (
		<div className='card'>
			<h3>{name}</h3>
			<div className='starCount'>{rating}</div>
			<p className='notes'>{notes}</p>
		</div>
	);
};

export default Card;
