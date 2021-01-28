import React from 'react';
import MyCard from './MyCard';
import { Grid } from '@material-ui/core';

import defaultImg from '../../assets/defaultImg.jpg';

const Column = ({ cards }) => {
	if (cards) {
		return cards.map((card) => (
			<Grid item xs key={card._id}>
				<MyCard
					name={card.name}
					rating={card.rating}
					note={card.note}
					date={card.createdAt}
					catId={card.belongsToCat}
					itemId={card._id}
					image={
						card.itemImage
							? `data:image/png;base64,${new Buffer.from(
									card.itemImage.data
							  ).toString('base64')}`
							: defaultImg
					}
				/>
			</Grid>
		));
	}
};

export default Column;
