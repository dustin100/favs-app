import React from 'react';
import MyCard from './MyCard';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		textAlign: 'center',
	},
}));

const Column = ({ cards, stars, rating }) => {
	const classes = useStyles();
	if (cards) {
		return (
			<Grid container direction='column' className={classes.root}>
				<Grid item xs={12}>
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
