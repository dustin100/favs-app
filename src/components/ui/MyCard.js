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
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/item';
import { parse, format } from 'date-fns';

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

const ITEM_HEIGHT = 48;

const MyCard = ({ name, note, date, deleteItem, catId, itemId }) => {
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

	const handleClose = (event) => {
		setAnchorEl(null);
		console.log('anything else');
	};

	const handleEdit = (event) => {
		setAnchorEl(null);
		console.log('edit');
		console.log(catId, itemId);
	};
	const handleDelete = (event) => {
		setAnchorEl(null);
		deleteItem(catId, itemId);
		console.log('delete');
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
							<MenuItem key='Edit' onClick={handleEdit}>
								Edit
							</MenuItem>
							<MenuItem key='Delete' onClick={handleDelete}>
								Delete
							</MenuItem>
						</Menu>
					</Fragment>
				}
				title={name}
				subheader={`Created on ${format(new Date(date), 'MMM-do-yyyy')}`}
			/>
			<CardMedia className={classes.media} image={beer} title='Beer' />

			<CardActions disableSpacing>
				<Typography>Notes</Typography>
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
					<Typography paragraph>{note}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default connect(null, { deleteItem })(MyCard);
