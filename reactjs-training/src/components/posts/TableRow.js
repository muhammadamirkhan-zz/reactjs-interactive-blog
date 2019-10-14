import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Popup from 'reactjs-popup';
import * as actions from '../../actions/index.js';
import * as actionTypes from '../../actions/types.js';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDeleteHandler: props.handleDelete,
      onEditHandler: props.onEditHandler
    };
  }

  handleDelete = () => {
    this.state.onDeleteHandler(this.props.id);
  };

  handleEdit = close => {
    this.props.handleEditPost({
      editId: this.props.id,
      title: this.state.title,
      body: this.state.body,
      tags: this.state.tags
    });

    close();
  };

  handleEditChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <tr>
        <td>
          <input type='checkbox' />
        </td>
        <td>
          {this.props.title}
          <br />
          <Link to={`/post/${this.props.id}`}>
            <button className='btn btn-primary'>View</button>
          </Link>
          <button className='btn btn-primary' onClick={this.handleDelete}>
            Delete
          </button>

          <Popup trigger={<button className='btn btn-primary'> Edit</button>}>
            {close => (
              <div>
                <div></div>
                <h3 className='add-text'>Edit POST</h3>
                <form>
                  <input
                    type='text'
                    className='title-blog'
                    placeholder='Enter Post Title Here...'
                    name='title'
                    value={this.state.title}
                    onChange={this.handleEditChange}
                  />
                  <br />
                  <input
                    type='text'
                    className='comment-section'
                    placeholder='Enter body Here...'
                    name='body'
                    value={this.state.body}
                    onChange={this.handleEditChange}
                  />
                </form>
                <br />
                <div className='post-tag-blog'>
                  <h4>Post Tags</h4>
                  <input
                    type='text'
                    className='post-tag-section'
                    name='tags'
                    value={this.state.tags}
                    onChange={this.handleEditChange}
                  />
                  <h6 className='last-text'>Seperate Tags With Commas</h6>
                </div>
                <button
                  onClick={() => this.handleEdit(close)}
                  className='publish-btn'
                >
                  Publish
                </button>
                } >
              </div>
            )}
          </Popup>
        </td>
        <td>{this.props.tags}</td>
        <td>{this.props.date}</td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  tags: PropTypes.string
};

const mapStateToProps = state => {
  return {
    posts: state.PostsReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleEditPost: payload =>
      dispatch(
        actions.handleActions(actionTypes.EDIT_POST_REQUEST).request(payload)
      )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableRow);
