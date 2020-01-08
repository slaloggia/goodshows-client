import { combineReducers } from 'redux';
import showReducer from './showReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    shows: showReducer,
    reviews: reviewReducer
})

export default rootReducer