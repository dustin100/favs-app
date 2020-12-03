import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
	console.log('getCurrentProfile is getting called?');
	try {
		const res = await axios.get('/profile/me');
		console.log(res);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};
