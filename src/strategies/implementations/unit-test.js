'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class UnitTestNavigationStrategy extends NavigationStrategy {
  getDestinations(location) {
    this.destinations.push({
      path: path.join(location.project, 'tests', 'unit', location.namespace, location.optDirectories, `${location.file}-test.js`),
      icon: 'javascript-test',
      namespace: 'tests'
    });

    return this.destinations.filter(destination => fs.existsSync(destination.path));
  }
}

export default UnitTestNavigationStrategy;
