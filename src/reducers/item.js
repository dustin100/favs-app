import {
	GET_ITEM,
	ITEM_ERROR,
	CLEAR_ITEM,
	UPDATE_ITEM,
} from '../actions/types';

const initialState = {
	itemInfo: [],
	loading: true,
	errors: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ITEM:
		case UPDATE_ITEM:
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
		case CLEAR_ITEM:
			return {
				...state,
				catInfo: [],
				loading: false,
			};

		default:
			return state;
	}
};
