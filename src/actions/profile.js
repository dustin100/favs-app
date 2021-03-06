// import axios from 'axios';
// import { setAlert } from './alert';
// import { GET_PROFILE, PROFILE_ERROR } from './types';

// // Get current users profile
// export const getCurrentProfile = () => async (dispatch) => {
// 	try {
// 		const res = await axios.get('/profile/me');

// 		dispatch({
// 			type: GET_PROFILE,
// 			payload: res.data,
// 		});
// 	} catch (err) {
// 		dispatch({
// 			type: PROFILE_ERROR,
// 			payload: { msg: err.response.status.text, status: err.response.status },
// 		});
// 	}
// };

// // Create or update profile
// export const createProfile = (formData, edit = false) => async (dispatch) => {
// 	try {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};

// 		const res = await axios.post('/profile', formData, config);
// 		dispatch({
// 			type: GET_PROFILE,
// 			payload: res.data,
// 		});

// 		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
// 	} catch (err) {
// 		const errors = err.response.data.errors;
// 		if (errors) {
// 			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
// 		}
// 		dispatch({
// 			type: PROFILE_ERROR,
// 			payload: { msg: err.response.status.text, status: err.response.status },
// 		});
// 	}
// };
