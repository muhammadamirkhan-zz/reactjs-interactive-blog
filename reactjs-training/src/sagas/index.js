import { call, put, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from '../actions/types.js';
import API_CLASS from '../actions/actions';

const API = new API_CLASS();

function* getComments(action) {
  try {
    const { data, error } = yield call(API.getComments, action.payload);
    yield put({
      type: ACTIONS.GET_COMMENTS_SUCCESS,
      payload: { comments: data, error: error }
    });
  } catch (e) {
    yield put({ type: ACTIONS.GET_COMMENTS_FAILURE, error: e.message });
  }
}

function* addPost(action) {
  try {
    const { data, error } = yield call(API.addPost, action.payload.post);
    yield put({
      type: ACTIONS.ADD_POST_SUCCESS,
      payload: { posts: data, error: error }
    });
  } catch (e) {
    yield put({ type: ACTIONS.ADD_POST_FAILURE, error: e.message });
  }
}

function* deleteCommentSaga(payload) {
  try {
    const { data } = yield call(API.deleteComments, payload.payload);
    yield put({ type: ACTIONS.DELETE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ACTIONS.DELETE_COMMENT_FAILURE, payload: error });
  }
}

function* deletePost(action) {
  try {
    const { data, error } = yield call(API.deletePost, action.payload);
    yield put({
      type: ACTIONS.DELETE_POST_SUCCESS,
      payload: { posts: data, error: error }
    });
  } catch (e) {
    yield put({
      type: ACTIONS.DELETE_POST_FAILURE,
      message: e.message
    });
  }
}

function* editCommentSaga(payload) {
  try {
    const { data } = yield call(
      API.editComment,
      payload.payload.postId,
      payload.payload.id,
      payload.payload.comment
    );
    yield put({ type: ACTIONS.EDIT_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ACTIONS.EDIT_COMMENT_FAILURE, payload: error });
  }
}
function* postCommentSaga(payload) {
  try {
    const { data } = yield call(API.postComments, payload.payload);
    yield put({ type: ACTIONS.POST_COMMENT_SUCCESS, payload: { data } });
  } catch (error) {
    yield put({ type: ACTIONS.POST_COMMENT_FAILURE, payload: error });
  }
}

function* scrollPageSaga(payload) {
  try {
    const { data } = yield call(API.scrollPage, payload.payload);
    yield put({ type: ACTIONS.GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ACTIONS.GET_POSTS_FAILURE, payload: error });
  }
}

function* editPost(payload) {
  try {
    const { data } = yield call(API.editPost, payload.payload);
    yield put({ type: ACTIONS.EDIT_POST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ACTIONS.EDIT_POST_FAILURE, payload: error });
  }
}

function* rootSaga() {
  yield takeEvery(ACTIONS.GET_COMMENTS_REQUEST, getComments);
  yield takeEvery(ACTIONS.EDIT_COMMENT_REQUEST, editCommentSaga);
  yield takeEvery(ACTIONS.POST_COMMENT_REQUEST, postCommentSaga);
  yield takeEvery(ACTIONS.DELETE_COMMENT_REQUEST, deleteCommentSaga);
  yield takeEvery(ACTIONS.GET_POSTS_REQUEST, scrollPageSaga);
  yield takeEvery(ACTIONS.ADD_POST_REQUEST, addPost);
  yield takeEvery(ACTIONS.DELETE_POST_REQUEST, deletePost);
  yield takeEvery(ACTIONS.EDIT_POST_REQUEST, editPost);
}
export default rootSaga;
