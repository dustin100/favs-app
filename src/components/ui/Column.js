import React from 'react';
import MyCard from './MyCard';
import { Grid } from '@material-ui/core';

const Column = ({ cards }) => {
	if (cards) {
		return cards.map((card) => {
			return (
				<Grid item xs>
					<MyCard
						key={card._id}
						name={card.name}
						rating={card.rating}
						note={card.note}
						date={card.createdAt}
						catId={card.belongsToCat}
						itemId={card._id}
					/>
				</Grid>
			);
		});
	}
};

export default Column;
