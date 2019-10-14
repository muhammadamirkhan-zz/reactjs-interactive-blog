import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';

import './AddPost.scss';
import Logo from '../posts/Logo';
import { API_LINK } from './constants';

class AdddNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.editId = props.match.params.id;
    this.addPost = props.location.addPost;

    if (this.editId) {
      axios
        .get(API_LINK + '/' + this.editId)
        .then(res => {
          this.setState({
            title: res.data.title,
            body: res.data.body,
            tag: res.data.tags
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, errorFlag: true });
        });
    }
  }
  state = { values: [], title: null, body: null, tag: null };

  handleSubmit = event => {
    this.addPost({
      postId: this.editId,
      post: {
        title: this.state.title,
        tags: this.state.tag,
        body: this.state.body
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <Logo />
        </div>
        <hr />
        <Link to='/'>
          <button className='back-button'>Back To Page</button>
        </Link>
        <h3 className='add-text'>ADD NEW POST</h3>
        <form>
          <input
            type='text'
            className='title-blog'
            placeholder='Enter Post Title Here...'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          <input
            type='text'
            className='comment-section'
            placeholder='Enter body Here...'
            name='body'
            value={this.state.body}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
          <h6 className='last-text'>Seperate Tags With Commas</h6>
        </div>

        <Popup
          trigger={
            <button onClick={this.handleSubmit} className='publish-btn'>
              Publish
            </button>
          }
        >
          <div className='add-post-publish'>
            <h3>
              Your Post Has Been Added Successfully! Click OK to Return to Main
              Page !
            </h3>
            <Link to='/'>
              <button className='btn btn-success'>OK</button>
            </Link>
          </div>
        </Popup>
      </div>
    );
  }
}
export default AdddNewPost;
