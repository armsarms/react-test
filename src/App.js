import React, { Component } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Main from './component/Main/Main'

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Main></Main>
      </div>
    );
  }
}

export default App;
