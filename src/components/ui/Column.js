import React from 'react';
import MyCard from './MyCard';

const Column = ({ cards, stars, rating }) => {
	if (cards) {
		return (
			<div className='col'>
				<h2>{stars}</h2>
				{cards.map((card) => {
					return (
						<MyCard name={card.name} rating={card.rating} notes={card.notes} />
					);
				})}
			</div>
		);
	}
};

export default Column;
