import React, { Component } from 'react';

import ErrorIndicator from '../../components/error-indicator';

import LoginPage from '../../pages/login';
import NotFoundPage from '../../pages/not-found'
import SplashPage from '../../pages/splash';

import { Router, Route, Switch } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import './app.scss';

const history = createBrowserHistory();
class App extends Component {

  state = {
    hasError: false
  }

  componentDidCatch(){
    this.setState({hasError: true});
  }

  render() {
    const { hasError } = this.state;

    if( hasError ){
      return <ErrorIndicator />
    }

    return (
      
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={SplashPage} />           
            <Route exact path="/login" component={LoginPage} />
            <Route component={ NotFoundPage }  />
          </Switch>
        </Router>
    )
  };
}

export default App;