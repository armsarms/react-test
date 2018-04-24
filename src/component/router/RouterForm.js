import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Form from '../Main/Form';

class RouterForm extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/3' component={Form} />          
          <Route path='/3/:id' component={Form} />          
        </Switch>
    );
  }
}

export default RouterForm;