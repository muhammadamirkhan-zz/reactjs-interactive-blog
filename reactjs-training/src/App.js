import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ViewPost from './components/posts/ViewPost.js';
import ListPost from './components/posts/ListPost.js';
import AddNewPost from './components/posts/AddPost';
import store from './store/index.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postId: null };
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Route path='/post/:id' component={ViewPost} />
            <Route path='/edit/:id' component={AddNewPost} />
            <Route exact path='/' component={ListPost} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
