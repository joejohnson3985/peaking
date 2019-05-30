import { combineReducers } from 'redux';
import { plantsReducer } from './plantsReducer'


const rootReducer = combineReducers({
  plants: plantsReducer
});

export default rootReducer;