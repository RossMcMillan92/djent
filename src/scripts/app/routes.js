import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/* containers */
import App from './containers/App';
import Home from './containers/Home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Redirect from='/**/share/:shareID' to='share/:shareID' />
        <Route path="share/:shareID" component={Home} id="share" />
        <Route path="preset/:presetID" component={Home} id="preset" />
        <Route status={404} path="*" component={Home} />
    </Route>
);
