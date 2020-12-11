import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import alert from './alert';
import category from './category';
import item from './item';


export default combineReducers({ auth, profile, alert, category, item });
