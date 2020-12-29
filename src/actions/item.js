import axios from 'axios';
import { setAlert } from './alert';
import { ITEM_ERROR, GET_ITEM, UPDATE_ITEM } from './types';

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
		await axios.post(`/item/${catId}`, formData, config);
		const res = await axios.get(`/item/${catId}`);
		dispatch({
			type: UPDATE_ITEM,
			payload: res.data,
		});

		history.push('/category');
		dispatch(setAlert('Item Added', 'success'));
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
		const res = await axios.get(`/item/${id}`);
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
export const deleteItem = (itemId, catId) => async (dispatch) => {
	try {
		await axios.delete(`/item/${itemId}`);
		const res = await axios.get(`/item/${catId}`);
		dispatch({
			type: UPDATE_ITEM,
			payload: res.data,
		});
		dispatch(setAlert('Item Deleted', 'error'));
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: { err },
		});
	}
};

// Edit item to category
export const editItem = (formData, rating, itemId, catId) => async (
	dispatch
) => {
	try {
		formData.rating = rating;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		await axios.patch(`/item/${itemId}`, formData, config);
		const res = await axios.get(`/item/${catId}`);
		dispatch({
			type: UPDATE_ITEM,
			payload: res.data,
		});
		dispatch(setAlert('Item Updated', 'success'));
	} catch (err) {
		console.log(err);
		dispatch({
			type: ITEM_ERROR,
			payload: { err },
		});
	}
};
