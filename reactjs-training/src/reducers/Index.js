import { combineReducers } from 'redux';

import CommentReducer from '../reducers/CommentReducers';
import PostsReducer from '../reducers/PostReducers';

const rootReducer = combineReducers({
  CommentReducer,
  PostsReducer
});
export default rootReducer;
