import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import configureStore from './store/configureStore';
import routes from './routes';

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
