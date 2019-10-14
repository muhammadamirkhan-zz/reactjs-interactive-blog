import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSortDown } from 'react-icons/fa';
import Popup from 'reactjs-popup';

import * as actions from '../../actions/index.js';
import * as actionTypes from '../../actions/types.js';
import TableRow from './TableRow';
import './ListPost.scss';
import './AddPost.scss';

import Logo from './Logo';
import editIcon from '../../../src/images/edit-icon.png';

class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      errorFlag: false,
      errorMessage: '',
      pageId: 1,
      orderbydescflag: true,
      orderby: '',
      postsCount: 100000,
      limit: 20,
      title: '',
      body: '',
      tags: '',
      searchQuery: ''
    };
    window.addEventListener('scroll', this.scrollPageData);
  }

  scrollPageData = e => {
    const scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop > this.state.pageId * 400) {
      this.setState(
        {
          pageId:
            this.state.postsCount < this.state.limit
              ? this.state.pageId
              : this.state.pageId + 1
        },
        () => {
          this.props.scrollPage({
            apiParams:
              '?page' + this.state.pageId + '&limit=' + this.state.limit,
            actionFlag: this.state.actionFlag
          });
          this.setState({ postsCount: this.props.posts.length });
        }
      );
    }
  };

  handleAddChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDeleteHandler = id => {
    this.props.deletePost(id);
  };

  componentDidMount() {
    this.props.scrollPage(this.apiCallParams());
  }

  apiCallParams = () => {
    if (this.state.orderby === '' && this.state.searchQuery === '') {
      return {
        apiParams: `?page${this.state.pageId}&limit=${this.state.limit}`,
        actionFlag: 0
      };
    } else if (this.state.searchQuery !== '') {
      return {
        apiParams:
          '?page' +
          this.state.pageId +
          '&limit=' +
          this.state.limit +
          '&sortBy=createdAt&order=' +
          '&search=' +
          this.state.searchQuery,
        actionFlag: 1
      };
    } else if (this.state.orderby !== '') {
      return {
        apiParams: '?sortBy=createdAt&order=' + this.state.orderby,
        actionFlag: 2
      };
    }
  };

  onChange = e => {
    this.setState({ searchQuery: e.target.value }, () =>
      this.props.scrollPage(this.apiCallParams())
    );
  };

  handleSortClick = () => {
    this.setState({orderby:'desc'})
    this.props.scrollPage(this.apiCallParams());
  };

  handleAddSubmit = close => {
    this.props.addPost({
      post: {
        title: this.state.title,
        tags: this.state.tag,
        body: this.state.body,
        createdAt: new Date()
      }
    });
    this.setState({ title: '' });
    this.setState({ body: '' });
    this.setState({ tags: '' });
    close();
  };

  tableRows = () => {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else {
      return this.props.posts.map(e => {
        return (
          <TableRow
            handleDelete={this.onDeleteHandler}
            key={Number(e.id)}
            id={e.id}
            title={e.title}
            tags={e.tags}
            date={e.createdAt}
          />
        );
      });
    }
  };

  render() {
    if (!this.state.errorFlag) {
      return (
        <div>
          <div className='main-div'>
            <Logo />
          </div>
          <br />
          <div className='table' onScroll={this.scrollPageData}>
            <table className='lists-post-page'>
              <tbody>
                <tr>
                  <td>
                    <img src={editIcon} className='edit-icon' alt='edit-icon' />
                  </td>
                  <td>
                    <span className='posts-column'>Posts</span>
                    <Popup
                      trigger={
                        <button className='add-new-button'> Add New</button>
                      }
                    >
                      {close => (
                        <div>
                          <div></div>
                          <h3 className='add-text'>ADD NEW POST</h3>
                          <form>
                            <input
                              type='text'
                              className='title-blog'
                              placeholder='Enter Post Title Here...'
                              name='title'
                              value={this.state.title}
                              onChange={this.handleAddChange}
                            />
                            <br />
                            <input
                              type='text'
                              className='comment-section'
                              placeholder='Enter body Here...'
                              name='body'
                              value={this.state.body}
                              onChange={this.handleAddChange}
                            />
                          </form>
                          <br />
                          <div className='post-tag-blog'>
                            <h4>Post Tags</h4>
                            <input
                              type='text'
                              className='post-tag-section'
                              name='tag'
                              value={this.state.tag}
                              onChange={this.handleAddChange}
                            />
                            <h6 className='last-text'>
                              Seperate Tags With Commas
                            </h6>
                          </div>
                          <button
                            onClick={() => this.handleAddSubmit(close)}
                            className='publish-btn'
                          >
                            Publish
                          </button>
                          } >
                        </div>
                      )}
                    </Popup>
                  </td>
                  <td></td>
                  <td>
                    <input
                      type='text'
                      className='search-feild'
                      placeholder='Search Post'
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <input type='checkbox' />
                  </th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>
                    <button
                      className='btn btn-primary'
                      onClick={this.handleSortClick}
                    >
                      Date
                      <FaSortDown />
                    </button>
                  </th>
                </tr>
                {this.tableRows()}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Api is having following issue :</h1>
          <br /> <h3>{this.state.errorMessage}</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.PostsReducer.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scrollPage: payload =>
      dispatch(
        actions.handleActions(actionTypes.GET_POSTS_REQUEST).request(payload)
      ),

    addPost: payload =>
      dispatch(
        actions.handleActions(actionTypes.ADD_POST_REQUEST).request(payload)
      ),
    deletePost: payload =>
      dispatch(
        actions.handleActions(actionTypes.DELETE_POST_REQUEST).request(payload)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPost);
