import React, { useEffect, Fragment } from 'react';
import Spinner from '../ui/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileForm from '../forms/ProfileForm';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import CategoryList from '../CategoryList';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Fab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '35px',
	},
	addBox: {
		minHeight: 100,
		position: 'relative',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

const Dashboard = ({
	getCurrentProfile,
	auth: { isAuthenticated },
	profile: { profile, loading },
}) => {
	const classes = useStyles();

	if (loading) {
		return <Spinner />;
	} else if (profile !== null) {
		return (
			<Fragment>
				<div className={classes.addBox}>
					<Fab
						className={classes.fab}
						component={Link}
						to='/categoryform'
						variant='extended'
						color='primary'
						aria-label='add'>
						<AddIcon color='secondary' />
						Category
					</Fab>
				</div>
				<CategoryList profile={profile} />
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<ProfileForm />
			</Fragment>
		);
	}
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
