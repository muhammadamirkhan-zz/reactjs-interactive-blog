import React, { Component } from 'react';

import nbsLogo from '../../images/nbs-logo.png';

export default class Logo extends Component {
  render() {
    return (
      <div className='main-div'>
        <img src={nbsLogo} className='nbs-logo' alt='logo' />
      </div>
    );
  }
}
