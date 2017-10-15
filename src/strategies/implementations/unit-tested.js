'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class UnitTestedNavigationStrategy extends NavigationStrategy {
  execute() {
    this.destinations.push({
      path: path.join(this.location.project, 'tests', 'unit', this.location.namespace, this.location.optDirectories, `${this.location.file}-test.js`),
      icon: 'javascript-test',
      namespace: 'tests'
    });

    return super.execute();
  }
}

export default UnitTestedNavigationStrategy;
