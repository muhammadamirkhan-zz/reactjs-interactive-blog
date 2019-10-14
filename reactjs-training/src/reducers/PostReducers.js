import * as ACTIONS from '../actions/types.js';

const initialState = {
  posts: []
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {


    case ACTIONS.GET_POSTS_REQUEST:
      return state;
    case ACTIONS.GET_POSTS_SUCCESS:
      if (action.payload.actionFlag === 0) {
        return { posts: [...state.posts, ...action.payload] };
      } else {
        return {
          posts: [...action.payload]
        };
      }
    case ACTIONS.GET_POSTS_FAILURE:
      return { ...state, error: action.payload.error };

    case ACTIONS.ADD_POST_REQUEST:
      return state;
    case ACTIONS.ADD_POST_SUCCESS:
      return {
        posts: [action.payload.posts, ...state.posts]
      };

    case ACTIONS.ADD_POST_FAILURE:
      return { ...state, error: action.payload };

    case ACTIONS.DELETE_POST_REQUEST:
      return state;
    case ACTIONS.DELETE_POST_SUCCESS:
      return {
        posts: [
          ...state.posts.filter(e => {
            return e.id !== action.payload.posts.id;
          })
        ]
      };
    case ACTIONS.DELETE_POST_FAILURE:
      return { ...state, error: action.payload };

    case ACTIONS.EDIT_COMMENT_REQUEST:
      return state;
    case ACTIONS.EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter(e => {
            return e.id !== action.payload.id;
          }),
          action.payload
        ].sort((p, n) => p.id - n.id)
      };

    case ACTIONS.EDIT_POST_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
export default PostsReducer;
