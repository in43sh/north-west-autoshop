import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Cars from '../components/Cars/Cars';
import Parts from '../components/Parts/Parts';

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/cars" component={ Cars }/>
    <Route path="/parts" component={ Parts }/>
  </Switch>
)