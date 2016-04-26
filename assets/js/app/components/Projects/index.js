import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

const PROJECTS = [{
  url: 'http://gradusdevelopment.com',
  name: 'Landed',
  about: 'San Francisco headquartered company on a mission: make it easier and smarter to buy and invest in urban homes.',
}, {
  url: 'http://andreykeske.com',
  name: 'Andrey Keske',
  about: 'Personal site portfolio for Front End Developer and Designer',
}];

/* images */
const icons = [];
PROJECTS.map(project => icons.push(require(`./files/${project.name.replace(' ', '')}.jpg`)));

export class Projects extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                Who's using Redux Easy Boilerplate
              </h2>
            </div>
          </div>

          <div className="row">
          {
            PROJECTS.map((project, key) =>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-center"
                key={key}
              >
                <a href={project.url}>
                  <img src={icons[key]} />
                </a>
                <h4>
                  {project.name}
                </h4>
                <p>
                  {project.about}
                </p>
                <a href={project.url}>
                  {project.url.replace('http://', '')}
                </a>
              </div>
            )
          }
          </div>

        </div>
      </section>
    );
  }
}
