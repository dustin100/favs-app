import {
	GET_CATEGORY,
	CATEGORY_ERROR,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	CLEAR_CATEGORY,
	GET_ALL_CATEGORY_DATA,
	UPDATE_PARAMS,
	UPDATE_PAGE,
	LOADING_CATEGORY,
} from '../actions/types';

const initialState = {
	catInfo: [],
	loading: true,
	errors: null,
	offset: 0,
	totalPages: null,
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
		case GET_CATEGORY:
		case UPDATE_CATEGORY:
			return {
				...state,
				catInfo: payload,
				loading: false,
			};
		case DELETE_CATEGORY:
			return {
				...state,
				catInfo: payload.data,
				loading: false,
				totalPages: payload.totalPages,
			};
		case GET_ALL_CATEGORY_DATA:
			return {
				...state,
				catInfo: payload.data,
				totalPages: payload.totalPages,
				loading: false,
			};

		case UPDATE_PARAMS:
			return {
				...state,
				filters: payload,
				currentPage: 1,
				offset: 0,
				loading: false,
			};

		case UPDATE_PAGE:
			return {
				...state,
				currentPage: payload.currentPage,
				offset: payload.skip,
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

		case LOADING_CATEGORY:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
