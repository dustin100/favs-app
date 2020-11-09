import React from 'react';
import Card from './Card';

const Column = ({ cards }) => {
	if (cards) {
		const listOfCards = cards.map((card) => {
			return <Card name={card.name} rating={card.rating} notes={card.notes} />;
        });
        return listOfCards
	}

	return <div className='col'>listOfCards</div>;
};

export default Column;
