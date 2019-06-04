import { combineReducers } from 'redux';
import { trailsReducer } from './trailsReducer'
import { loadingReducer } from './loadingReducer'
import { errorReducer } from './errorReducer'


const rootReducer = combineReducers({
  trails: trailsReducer,
  isLoading: loadingReducer,
  error: errorReducer 
});

export default rootReducer;