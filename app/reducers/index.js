import { combineReducers } from 'redux';
import * as fooReducer from './fooReducer';

export default combineReducers(Object.assign(
    fooReducer,
));