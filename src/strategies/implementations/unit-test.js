'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class UnitTestNavigationStrategy extends NavigationStrategy {
  execute() {
    let matches = /([a-z0-9-]*)-test/.exec(this.location.file);
    let fileName = matches ? matches[1] : '';

    matches = /([a-z0-9-]*)[\/\\]/.exec(this.location.optDirectories);
    let namespace = matches ? matches[1] : '';

    this.destinations.push({
      path: path.join(this.location.project, 'app', this.location.optDirectories, `${fileName}.js`),
      icon: 'javascript',
      namespace
    });

    return super.execute();
  }
}

export default UnitTestNavigationStrategy;
