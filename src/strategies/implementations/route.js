'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class RouteNavigationStrategy extends NavigationStrategy {
  getDestinations(location) {
    this.destinations.push(...[
      {
        path: path.join(location.project, location.parent, 'templates', location.optDirectories, `${location.file}.hbs`),
        icon: 'handlebars',
        namespace: 'templates'
      },
      {
        path: path.join(location.project, location.parent, 'controllers', location.optDirectories, `${location.file}.js`),
        icon: 'javascript',
        namespace: 'controllers'
      },
      {
        path: path.join(location.project, 'tests', 'unit', location.namespace, location.optDirectories, `${location.file}-test.js`),
        icon: 'javascript-test',
        namespace: 'tests'
      },
      {
        path: path.join(location.project, location.parent, 'router.js'),
        icon: 'javascript',
        namespace: 'router'
      }
    ]);

    return this.destinations.filter(destination => fs.existsSync(destination.path));
  }
}

export default RouteNavigationStrategy;
