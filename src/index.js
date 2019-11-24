import React from 'react';
import ReactDOM from 'react-dom';

import initializeStore from './store/configStore';
import { Provider } from 'react-redux';

import './index.scss';

import App from './common/app';

const rootEl = document.getElementById('root');
const store = initializeStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./common/app', () => {
    render(App);
  });
}