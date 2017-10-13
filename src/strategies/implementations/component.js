'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class ComponentNavigationStrategy extends NavigationStrategy {
  getDestinations(location) {
    this.destinations.push(...[
      {
        path: path.join(location.project, location.parent, 'templates', 'components', location.optDirectories, `${location.file}.hbs`),
        icon: 'javascript',
        namespace: 'templates'
      },
      {
        path: path.join(location.project, 'tests', 'integration', location.namespace, location.optDirectories, `${location.file}-test.js`),
        icon: 'javascript-test',
        namespace: 'tests'
      }
    ]);

    return this.destinations.filter(destination => fs.existsSync(destination.path));
  }
}

export default ComponentNavigationStrategy;
