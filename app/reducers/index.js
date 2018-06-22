import { combineReducers } from 'redux';
import cognito from './cognito';
import create from './create';

export default combineReducers({
    cognito,
    create,
});
