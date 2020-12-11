import { GET_CATEGORY, CATEGORY_ERROR } from '../actions/types';

const initialState = {
	catInfo: null,
	loading: true,
	errors: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_CATEGORY:
			return {
				...state,
				catInfo: payload,
				loading: false,
			};
		case CATEGORY_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};

		default:
			return state;
	}
};
