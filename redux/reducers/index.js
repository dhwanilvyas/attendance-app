import { combineReducers } from 'redux';
import studentReducer from './student';

const rootReducer = combineReducers({
  student: studentReducer
});

export default rootReducer;
