import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { addItemImage } from '../../actions/item';
import { Button, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
	faceImage: {
		color: theme.palette.primary.light,
	},
	save: {
		margin: '.5rem',
	},
}));

const AddImage = ({
	itemId,
	handleClose,
	addItemImage,
    params,
    catId
}) => {
	const classes = useStyles();
	const [selectedFile, setSelectedFile] = useState(null);

	const handleCapture = ({ target }) => {
		setSelectedFile(target.files[0]);
	};

	const handleSubmit = async () => {
		let fd = new FormData();
		fd.append('itemImage', selectedFile);
		handleClose();
		await addItemImage(itemId, fd, catId, params);
        
       
	};
	return (
		<Fragment>
			<input
				accept='image/jpeg'
				className={classes.input}
				id='faceImage'
				type='file'
				onChange={handleCapture}
			/>
			<Tooltip title='Select Image'>
				<label htmlFor='faceImage'>
					<IconButton
						className={classes.faceImage}
						color='primary'
						aria-label='upload picture'
						component='span'>
						<PhotoCamera fontSize='large' />
					</IconButton>
				</label>
			</Tooltip>
			<label>{selectedFile ? selectedFile.name : 'Select Image'}</label>. . .
			<Button
				className={classes.save}
				onClick={() => handleSubmit()}
				variant='outlined'
				color='secondary'>
				Save
			</Button>
		</Fragment>
	);
};

const mapStateToProps = (state)=>({
params: state.item.filters
})
export default connect(mapStateToProps, { addItemImage })(AddImage);
