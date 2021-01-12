import {
	GET_ITEM,
	ITEM_ERROR,
	CLEAR_ITEM,
	UPDATE_ITEM,
	UPDATE_ITEM_PAGE,
	UPDATE_ITEM_PARAMS,
} from '../actions/types';

const initialState = {
	itemInfo: [],
	loading: true,
	errors: {},
	offset: 0,
	totalPages: 1,
	currentPage: 1,
	filters: {
		limit: 3,
		skip: 0,
		sortBy: `createdAt:desc`,
	},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ITEM:
		case UPDATE_ITEM:
			return {
				...state,
				itemInfo: payload.data,
				loading: false,
				totalPages: payload.totalPages,
			};
		case UPDATE_ITEM:
			return {
				...state,
				itemInfo: payload.data,
				loading: false,
			};
		case UPDATE_ITEM_PAGE:
			return {
				...state,
				currentPage: payload.currentPage,
				offset: payload.skip,
				loading: false,
			};
		case UPDATE_ITEM_PARAMS:
			return {
				...state,
				filters: payload,
				currentPage: 1,
				offset: 0,
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
