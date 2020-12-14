import React, { Fragment, useState } from 'react';
import EditItemForm from '../forms/EditItemForm';
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
	Popover,
} from '@material-ui/core';
import clsx from 'clsx';
import defaultImg from '../../assets/defaultImg.jpg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/item';
import { format } from 'date-fns';

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

const MyCard = ({ name, note, date, deleteItem, catId, itemId, rating }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [anchorEditEl, setEditAnchorEl] = useState(null);

	// For 3 dots menu
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	// For edit button
	const handleEditClose = () => {
		setEditAnchorEl(null);
		handleClose();
	};

	const handleEdit = (e) => {
		setEditAnchorEl(e.currentTarget);
	};

	const openEdit = Boolean(anchorEditEl);
	const edit = open ? 'simple-popover' : undefined;

	
	// For Delete Button
	const handleDelete = () => {
		setAnchorEl(null);
		deleteItem(catId, itemId);
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
							<Popover
								id={edit}
								open={openEdit}
								anchorEl={anchorEditEl}
								onClose={handleEditClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}>
								<EditItemForm
									handleClose={handleEditClose}
									catId={catId}
									itemId={itemId}
									currentName={name}
									currentRating={rating}
									currentNote={note}
								/>
							</Popover>
							<MenuItem key='Delete' onClick={handleDelete}>
								Delete
							</MenuItem>
						</Menu>
					</Fragment>
				}
				title={name}
				subheader={`Created on ${format(new Date(date), 'MMM-do-yyyy')}`}
			/>
			<CardMedia className={classes.media} image={defaultImg} title='image' />

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
