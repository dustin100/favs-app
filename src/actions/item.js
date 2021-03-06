import axios from 'axios';
import { setAlert } from './alert';
import {
	ITEM_ERROR,
	GET_ITEM,
	UPDATE_ITEM,
	UPDATE_ITEM_PAGE,
	UPDATE_ITEM_PARAMS,
	LOADING_ITEM,
} from './types';

// Add item to category
export const addItem = (formData, rating, history, catId) => async (
	dispatch
) => {
	dispatch({
		type: LOADING_ITEM,
	});
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

		dispatch({
			type: ITEM_ERROR,
			payload: { err },
		});
	}
};

// Add item Image
export const addItemImage = (itemId, image, catId, params) => async (
	dispatch
) => {
	dispatch({
		type: LOADING_ITEM,
	});
	try {
		const config = {
			headers: {
				'Content-Type': 'imageFile',
			},
		};
		await axios.post(`/item/${itemId}/image`, image, config);
		const res = await axios.get(`/item/${catId}`, { params });
		dispatch({
			type: UPDATE_ITEM,
			payload: res.data,
		});

		dispatch(setAlert('Item Added', 'success'));
	} catch (err) {
		dispatch(setAlert(err.response.data.error, 'error'));
		dispatch({
			type: ITEM_ERROR,
			payload: err.response.data.error,
		});
	}
};

export const getItem = (params, id) => async (dispatch) => {
	dispatch({
		type: LOADING_ITEM,
	});
	try {
		const res = await axios.get(`/item/${id}`, { params });
		dispatch({
			type: GET_ITEM,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: { err },
		});
	}
};

// Delete item
export const deleteItem = (itemId, catId, params) => async (dispatch) => {
	dispatch({
		type: LOADING_ITEM,
	});
	try {
		await axios.delete(`/item/${itemId}`);
		const res = await axios.get(`/item/${catId}`, { params });
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
export const editItem = (formData, rating, itemId, catId, params) => async (
	dispatch
) => {
	dispatch({
		type: LOADING_ITEM,
	});
	try {
		formData.rating = rating;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		await axios.patch(`/item/${itemId}`, formData, config);
		const res = await axios.get(`/item/${catId}`, { params });
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

// Pagination
export const updatePage = (page) => async (dispatch) => {
	dispatch({
		type: LOADING_ITEM,
	});
	dispatch({
		type: UPDATE_ITEM_PAGE,
		payload: page,
	});
};

// Filter Category
export const filterItemList = (params) => async (dispatch) => {
	dispatch({
		type: LOADING_ITEM,
	});
	dispatch({
		type: UPDATE_ITEM_PARAMS,
		payload: params,
	});
};
