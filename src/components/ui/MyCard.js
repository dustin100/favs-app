import React, { Fragment, useState } from 'react';
import {
	makeStyles,
	Typography,
	IconButton,
	Collapse,
	CardActions,
	CardContent,
	CardMedia,
	Card,
	CardHeader,
	Menu,
	MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';
import beer from '../../assets/beer.jpg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 345,
		marginBottom: '1rem',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}));

const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

const MyCard = ({ name, note, date }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card variant='outlined' className={classes.root}>
			<CardHeader
				action={
					<Fragment>
						<IconButton
							aria-label='options'
							aria-haspopup='true'
							onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id='long-menu'
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: '20ch',
								},
							}}>
							{options.map((option) => (
								<MenuItem key={option} onClick={handleClose}>
									{option}
								</MenuItem>
							))}
						</Menu>
					</Fragment>
				}
				title={name}
				subheader={date}
			/>
			<CardMedia className={classes.media} image={beer} title='Beer' />
			<CardContent>
				<Typography variant='body2' component='p'>Notes</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography paragraph>Additional Notes</Typography>

					<Typography paragraph>{note}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default MyCard;
