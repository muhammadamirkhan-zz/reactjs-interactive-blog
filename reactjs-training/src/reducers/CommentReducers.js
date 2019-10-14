import * as ACTIONS from '../actions/types';

const initialState = {
  comments: []
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_COMMENTS_REQUEST:
      return state;
    case ACTIONS.GET_COMMENTS_SUCCESS:
      return {
        comments: [...action.payload.comments]
      };
    case ACTIONS.GET_COMMENTS_FAILURE:
      return { ...state, error: action.payload.error };

    case ACTIONS.EDIT_COMMENT_REQUEST:
      return state;
    case ACTIONS.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(e => {
            return e.id !== action.payload.id;
          }),
          action.payload
        ].sort((p, n) => p.id - n.id)
      };
    case ACTIONS.EDIT_COMMENT_FAILURE:
      return { ...state, error: action.payload.error };

    case ACTIONS.POST_COMMENT_REQUEST:
      return state;
    case ACTIONS.POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload.data]
      };
    case ACTIONS.POST_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    case ACTIONS.DELETE_COMMENT_REQUEST:
      return state;
    case ACTIONS.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments.filter(e => e.id !== action.payload.id)]
      };
    case ACTIONS.DELETE_COMMENT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default CommentReducer;
