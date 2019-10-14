import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axois from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import { API_LINK } from './constants';
import * as actions from '../../actions/index.js';
import * as actionTypes from '../../actions/types.js';
import Logo from './Logo';
import './ViewPost.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.body = React.createRef();
    this.state = {
      title: '',
      body: '',
      items: [],
      errorFlag: false,
      errorMessage: '',
      liked: localStorage.getItem(`likes${props.match.params.id}`),
      likes: 0
    };
  }

  componentWillMount() {
    this.props.getComments(this.props.match.params.id);
  }

  handleLikeClick = () => {
    this.setState({
      liked: true
    });
    axois
      .post(`${API_LINK}/${this.props.match.params.id}/likes`)
      .then(response => {
        localStorage.setItem(
          `post${this.props.match.params.id}`,
          response.data.id
        );
      })
      .catch(error => {
        this.setState({ errorMessage: `Like Post Error: ${error.message}` });
      });
    localStorage.setItem('likes' + this.props.match.params.id, true);
    this.setState({ likes: this.state.likes + 1 });
  };

  handleUnlikeClick = () => {
    this.setState({
      liked: false
    });

    axois
      .delete(
        `${API_LINK}/${this.props.match.params.id}/likes/${localStorage.getItem(
          `post${this.props.match.params.id}`
        )}`
      )
      .then(response => {
        localStorage.removeItem(`post${this.props.match.params.id}`);
      })
      .catch(error => {
        this.setState({ errorMessage: `Unlike Post Error: ${error.message}` });
      });
    localStorage.setItem('likes' + this.props.match.params.id, false);
    this.setState({ likes: this.state.likes - 1 });
  };

  handleCommentSubmit = e => {
    this.props.postComments({
      name: 'Amir Khan',
      createdAt: new Date(),
      message: this.body.current.value,
      postId: this.props.match.params.id
    });
    this.body.current.value = '';
  };

  handleDeleteComment = e => {
    this.props.deleteComment({
      commentId: e,
      postId: this.props.match.params.id
    });
  };
  handleEditComment(id, close) {
    this.props.editComment({
      postId: this.props.match.params.id,
      id,
      comment: {
        message: this.state.editCommentInput,
        createdAt: new Date()
      }
    });
    close();
  }

  handleCommentEditChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axois
      .get(`${API_LINK}/${this.props.match.params.id}/likes`)
      .then(res => {
        this.setState({ likes: res.data.length, errorFlag: false });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.setState({ errorFlag: true });
      });
    axois
      .get(`${API_LINK}/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.setState({ errorFlag: true });
      });
  }

  render() {
    const text = this.state.liked ? (
      <button className='btn btn-danger' onClick={this.handleUnlikeClick}>
        <FaThumbsDown />
      </button>
    ) : (
      <button className='btn btn-success' onClick={this.handleLikeClick}>
        <FaThumbsUp />
      </button>
    );
    const label = this.state.liked ? 'Unlike' : 'Like';
    const postItems = this.props.comments.map(comment => (
      <div key={Number(comment.id)}>
        <hr />
        <h3>Name:{comment.name}</h3>
        <h3>Message:{comment.message}</h3>
        <h3>Date Posted : {comment.createdAt}</h3>
        <button onClick={() => this.handleDeleteComment(comment.id)}>
          Delete
        </button>
        <Popup trigger={<button>Edit</button>}>
          {close => (
            <div>
              <input
                type='text'
                name='editCommentInput'
                onChange={this.handleCommentEditChange}
              />
              <br />
              <button onClick={() => this.handleEditComment(comment.id, close)}>
                Submit
              </button>
            </div>
          )}
        </Popup>
        <hr />
      </div>
    ));
    if (!this.state.errorFlag) {
      return (
        <React.Fragment>
          <div className='logo'>
            <Logo />
            <br />
          </div>
          <div className='image-with-text-div'>
            <Link to='/'>
              <button className='btn btn-primary'>Back</button>
            </Link>
            <p className='image-text'>{this.state.items.title}</p>
          </div>
          <div className='dummy-text'>
            <p>{this.state.items.body}</p>
            <br />
            Likes = {this.state.likes}
            <br />
            {text}
            {label}
            <br />
            <br />
          </div>
          <div className='comment-box'>
            {postItems}
            <textarea
              name='body'
              ref={this.body}
              rows='10'
              className='comment-text-area'
              placeholder='Write your comment...'
            ></textarea>
            <button
              className='leave-comment'
              onClick={this.handleCommentSubmit}
            >
              Leave Your Comment
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <h1>Unfortunately, API is not responding: </h1>
          <h2>{this.state.errorMessage}</h2>
        </div>
      );
    }
  }
}
ViewPost.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  getComments: PropTypes.func,
  comment: PropTypes.array
};

const mapStateToProps = state => ({
  comments: state.CommentReducer.comments
});
const mapDispatchToProps = dispatch => {
  return {
    postComments: payload =>
      dispatch(
        actions.handleActions(actionTypes.POST_COMMENT_REQUEST).request(payload)
      ),
    getComments: payload =>
      dispatch(
        actions.handleActions(actionTypes.GET_COMMENTS_REQUEST).request(payload)
      ),
    deleteComment: payload =>
      dispatch(
        actions
          .handleActions(actionTypes.DELETE_COMMENT_REQUEST)
          .request(payload)
      ),

    editComment: payload =>
      dispatch(
        actions.handleActions(actionTypes.EDIT_COMMENT_REQUEST).request(payload)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewPost));
