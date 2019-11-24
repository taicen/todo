import React, { Component } from 'react';
/** UI */
// import Button from 'antd/es/button';
/** Components */
import ErrorIndicator from '../../components/error-indicator';

import LoginPage from '../../pages/login';
import NotFoundPage from '../../pages/not-found'
import SplashPage from '../../pages/splash';

import { Router, Route, Switch } from 'react-router-dom'

import { createBrowserHistory } from 'history'
/** Stylizer */
import './app.scss';

const history = createBrowserHistory();
class App extends Component {

  state = {
    hasError: false
  }

  /** отлавливает ошибки в дочерних компонентах, внутри себя нет */
  componentDidCatch(){
    this.setState({hasError: true});
  }

  componentDidMount() {}

  componentDidUpdate(){}

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