import React, { Fragment } from 'react';
import MyCard from './MyCard';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	title: {
		textAlign: 'center',
	},
}));

const Column = ({ cards, stars, rating }) => {
	const classes = useStyles();
	if (cards) {
		return (
			<Grid
				container
				direction='column'
				justify='flex-start'
				alignItems='center'>
				<Grid item>
					<h2 className={classes.title}>{stars}</h2>
					{cards.map((card) => {
						return (
							<MyCard
								name={card.name}
								rating={card.rating}
								notes={card.notes}
							/>
						);
					})}
				</Grid>
			</Grid>
		);
	}
};

export default Column;
