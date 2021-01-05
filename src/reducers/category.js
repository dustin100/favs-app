import {
	GET_CATEGORY,
	CATEGORY_ERROR,
	UPDATE_CATEGORY,
	CLEAR_CATEGORY,
	GET_ALL_CATEGORY_DATA,
} from '../actions/types';

const initialState = {
	catInfo: [],
	loading: true,
	errors: null,
	offset: 0,
	totalPages: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_CATEGORY:
		case UPDATE_CATEGORY:
			return {
				...state,
				catInfo: payload,
				loading: false,
			};
		case GET_ALL_CATEGORY_DATA:
			return {
				...state,
				catInfo: payload.data,
				offset: payload.offset,
				totalPages: payload.totalPages,
			};
		case CLEAR_CATEGORY:
			return {
				...state,
				catInfo: [],
				loading: false,
			};

		case CATEGORY_ERROR:
			return {
				...state,
				errors: payload,
				loading: false,
			};

		default:
			return state;
	}
};
