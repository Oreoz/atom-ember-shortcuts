'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class ComponentNavigationStrategy extends NavigationStrategy {
  execute() {
    this.destinations.push(...[
      {
        path: path.join(this.location.project, this.location.parent, 'templates', 'components', this.location.optDirectories, `${this.location.file}.hbs`),
        icon: 'javascript',
        namespace: 'templates'
      },
      {
        path: path.join(this.location.project, 'tests', 'integration', this.location.namespace, this.location.optDirectories, `${this.location.file}-test.js`),
        icon: 'javascript-test',
        namespace: 'tests'
      }
    ]);

    return super.execute();
  }
}

export default ComponentNavigationStrategy;
