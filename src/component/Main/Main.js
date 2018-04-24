import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../Home'
import Github from '../Github';
import Form from './Form';
import UserList from './UserList';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route path='/1' component={Roster} /> */}
          <Route path='/2' render={(props) => (
            <Github {...props} source="https://api.github.com/users/octocat/gists" />
          )} />
          <Route path='/3' component={Form} />          
          <Route path='/4' component={UserList} />          
        </Switch>
      </div>
    );
  }
}

export default Main;