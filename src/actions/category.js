// import axios from 'axios';
// import { setAlert } from './alert';
// import { GET_CATEGORY, CATEGORY_ERROR } from './types';

// // Create or update category
// export const createCategory = (formData, edit = false) => async (dispatch) => {
// 	try {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};

// 		const res = await axios.post('/category', formData, config);
// 		dispatch({
// 			type: GET_CATEGORY,
// 			payload: res.data,
// 		});

// 		dispatch(
// 			setAlert(edit ? 'Category Updated' : 'Category Created', 'success')
// 		);
// 	} catch (err) {
// 		const errors = err.response.data.errors;
// 		if (errors) {
// 			errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
// 		}
// 		dispatch({
// 			type: CATEGORY_ERROR,
// 			payload: { msg: err.response.status.text, status: err.response.status },
// 		});
// 	}
// };
