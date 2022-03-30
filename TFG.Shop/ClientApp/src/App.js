import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Counter } from './components/Counter';

import './custom.css'
import Orders from './components/Orders';
import Home from './components/Home';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/orders' component={Orders} />
      </Layout>
    );
  }
}
