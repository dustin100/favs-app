import React from 'react';
import Card from './Card';

const Column = ({ cards, stars }) => {
	if (cards) {
		return (
			<div className='col'>
				<h2>{stars}</h2>
				{cards.map((card) => {
					return (
						<Card name={card.name} rating={card.rating} notes={card.notes} />
					);
				})}
			</div>
		);
	}
};

export default Column;
