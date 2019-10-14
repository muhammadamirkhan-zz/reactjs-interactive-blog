import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../posts/Logo';
import { ApiLink } from './constants';
import './AddPost.scss';

class EditPost extends React.Component {
  state = { values: [], title: null, body: null, tag: null };

  handleSubmit = event => {
    var values = {
      title: this.state.title.value,
      body: this.state.body.value,
      tag: this.state.tag.value
    };
    axios.put(ApiLink + '/' + this.props.match.params.id, {
      title: values.title,
      tag: values.tag,
      body: values.body
    });
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
        <h3 className='add-text'>EDIT POST</h3>
        <form>
          <input
            type='text'
            className='title-blog'
            placeholder='Enter New Title Here...'
            ref={title => (this.state.title = title)}
          />
          <br />
          <input
            type='text'
            className='comment-section'
            placeholder='Enter new body Here...'
            ref={body => (this.state.body = body)}
          />
        </form>
        <br />
        <div className='post-tag-blog'>
          <h4>Post Tags</h4>
          <input
            type='text'
            className='post-tag-section'
            ref={tag => (this.state.tag = tag)}
          />
          <h6 className='last-text'>Seperate Tags With Commas</h6>
        </div>
        <button onClick={this.handleSubmit} className='publish-btn'>
          Edit Now
        </button>
      </div>
    );
  }
}
export default EditPost;
