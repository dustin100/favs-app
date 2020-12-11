import { GET_ITEM, ITEM_ERROR } from '../actions/types';

const initialState = {
	itemInfo: null,
	loading: true,
	errors: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ITEM:
			return {
				...state,
				itemInfo: payload,
				loading: false,
			};
		case ITEM_ERROR:
			return {
				...state,
				errors: payload,
				loading: false,
			};

		default:
			return state;
	}
};
