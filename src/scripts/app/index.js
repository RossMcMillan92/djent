import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import configureStore from './store/configureStore';
import routes from './routes';

const history = useRouterHistory(createHistory)({ queryKey: false });
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
