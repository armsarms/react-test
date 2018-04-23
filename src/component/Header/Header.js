import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import logo from '../../logo.svg';
class Header extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/2'>Header</Link></li>
          <li><Link to='/3'>Footer</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;