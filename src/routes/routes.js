import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Cars from '../components/Cars/Cars';
import Parts from '../components/Parts/Parts';
import Admin from '../components/Admin/Admin';
import OneCar from '../components/Cars/OneCar/OneCar';

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/car/:_id" component={ OneCar } />
    <Route path="/cars" component={ Cars }/>
    <Route path="/parts" component={ Parts }/>
    <Route path="/admin" component={ Admin }/>
    
  </Switch>
)