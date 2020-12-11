import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const SimpleAlert = ({ alerts }) => {
	const classes = useStyles();

	if (alerts !== null && alerts.length > 0) {
		return alerts.map((alert) => {
			return (
				<div key={alert.id} className={classes.root}>
					<Alert severity={alert.alertType} variant='outlined'>
						{alert.msg}
					</Alert>
				</div>
			);
		});
	} else {
		return null;
	}
};

Alert.propTypes = {
	alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(SimpleAlert);
