import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/types';

const initialState = {
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
			};

		default:
			return state;
	}
};
