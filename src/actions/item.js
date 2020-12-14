import axios from 'axios';
import { setAlert } from './alert';
import { ITEM_ERROR, GET_ITEM, GET_CATEGORY, CATEGORY_ERROR } from './types';

// Add item to category
export const addItem = (formData, rating, history, catId) => async (
	dispatch
) => {
	try {
		formData.rating = rating;
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

export const getItem = (id) => async (dispatch) => {
	try {
		const res = await axios.post(`/item/${id}`);
		dispatch({
			type: GET_ITEM,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// Delete item
export const deleteItem = (catId, itemId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/item/${catId}/${itemId}`);

		dispatch({
			type: GET_CATEGORY,
			payload: res.data,
		});
		dispatch(setAlert('Item Deleted', 'error'));
	} catch (err) {
		dispatch({
			type: CATEGORY_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// Edit item to category
export const editItem = (formData, rating, history, catId) => async (
	dispatch
) => {
	try {
		formData.rating = rating;
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