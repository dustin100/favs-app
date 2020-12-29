import {
	GET_CATEGORY,
	CATEGORY_ERROR,
	UPDATE_CATEGORY,
	CLEAR_CATEGORY,
} from '../actions/types';

const initialState = {
	catInfo: [],
	loading: true,
	errors: null,
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
