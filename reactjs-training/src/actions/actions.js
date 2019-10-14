import axios from 'axios';

import { API_LINK } from '../components/posts/constants.js';

class API_CLASS {
  getComments = postId => {
    const resp = axios
      .get(API_LINK + '/' + postId + '/comments/')
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  scrollPage = payload => {
    const resp = axios
      .get(`${API_LINK}${payload.apiParams}`)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  editPost = payload => {
    const resp = axios
      .put(`${API_LINK}/${payload.editId}`, {
        title: payload.title,
        body: payload.body,
        tags: payload.tags
      })
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  postComments = payload => {
    const resp = axios
      .post(`${API_LINK}/${payload.postId}/comments`, payload)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  deleteComments = payload => {
    const resp = axios
      .delete(
        API_LINK + '/' + payload.postId + '/comments/' + payload.commentId
      )
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  editComment = (postId, commentId, data) => {
    const resp = axios
      .put(`${API_LINK}/${postId}/comments/${commentId}`, data)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  addPost = post => {
    const resp = axios
      .post(`${API_LINK}/`, post)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };

  deletePost = id => {
    const resp = axios
      .delete(`${API_LINK}/${id}`)
      .then(res => {
        return { data: res.data, error: false };
      })
      .catch(err => {
        return { data: null, error: err.message };
      });
    return resp;
  };
}
export default API_CLASS;
