import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

/* images */
const reactjs = require('./files/reactjs.png');
const redux = require('./files/redux.png');
const babel = require('./files/babel.png');
const webpack = require('./files/webpack.png');
const bootstrap = require('./files/bootstrap.png');
const mocha = require('./files/mocha.png');

export class Tools extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                Boilerplate contains
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={reactjs} />
              <h4>
                React
              </h4>
            </div>

            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={redux} />
              <h4>
                Redux
              </h4>
            </div>

            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={babel} />
              <h4>
                Babel
              </h4>
            </div>

            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={webpack} />
              <h4>
                Webpack
              </h4>
            </div>

            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={bootstrap} />
              <h4>
                Bootstrap
              </h4>
            </div>

            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 tool">
              <img src={mocha} />
              <h4>
                Mocha
              </h4>
            </div>
          </div>

        </div>
      </section>
    );
  }
}
