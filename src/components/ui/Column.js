import React from 'react';
import Card from './Card';

const Column = ({ cards }) => {
	if (cards) {
		return (
			<div className='col'>
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
