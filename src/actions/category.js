import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_CATEGORY,
	CATEGORY_ERROR,
	PROFILE_ERROR,
	UPDATE_CATEGORY,
} from './types';

// Get all categories by user
export const getCategoryList = () => async (dispatch) => {
	try {
		const res = await axios.get(`/category`);
		dispatch({
			type: GET_CATEGORY,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CATEGORY_ERROR,
			payload: err,
		});
	}
};

// Get current category
export const getCategory = (id, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/category/${id}`);
		console.log(res.data);
		dispatch({
			type: GET_CATEGORY,
			payload: res.data,
		});
		history.push('/category');
	} catch (err) {
		console.log(err)
		dispatch({
			type: CATEGORY_ERROR,
			payload: err,
		});
	}
};

// Create category
export const createCategory = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/category', formData, config);
		dispatch({
			type: UPDATE_CATEGORY,
			payload: res.data,
		});

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/category/${id}`);

		dispatch({
			type: UPDATE_CATEGORY,
			payload: res.data,
		});
		dispatch(setAlert('Category Deleted', 'error'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// Edit Category
export const editCategory = (formData, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.patch(`/category/${id}`, formData, config);
		dispatch({
			type: UPDATE_CATEGORY,
			payload: res.data,
		});

		dispatch(setAlert('Category Updated', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};
