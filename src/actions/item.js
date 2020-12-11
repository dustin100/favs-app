import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_CATEGORY,
	CATEGORY_ERROR,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	ITEM_ERROR,
	GET_ITEM,
} from './types';

// Add item to category 
export const addItem = (formData, rating, history, catId) => async (
	dispatch
) => {
	try {
		formData.rating = rating;
		console.log(formData);
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post(`/item/${catId}`, formData, config);
		dispatch({
			type: GET_ITEM,
			payload: res.data,
		});
		history.push('/category');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: ITEM_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// export const getItems = (id) => async (
// 	dispatch
// ) => {
// 	try {

// 		const res = await axios.post(`/item/${id}`);
// 		dispatch({
// 			type: GET_ITEM,
// 			payload: res.data,
// 		});
// 	} catch (err) {

// 		dispatch({
// 			type: ITEM_ERROR,
// 			payload: { msg: err.response.status.text, status: err.response.status },
// 		});
// 	}
// };
