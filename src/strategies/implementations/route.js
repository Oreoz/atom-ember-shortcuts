'use babel';

const path = require('path');
const fs = require('fs');

import NavigationStrategy from '../abstractions/navigation';

class RouteNavigationStrategy extends NavigationStrategy {
  execute() {
    this.destinations.push(...[
      {
        path: path.join(this.location.project, this.location.parent, 'templates', this.location.optDirectories, `${this.location.file}.hbs`),
        icon: 'handlebars',
        namespace: 'templates'
      },
      {
        path: path.join(this.location.project, this.location.parent, 'controllers', this.location.optDirectories, `${this.location.file}.js`),
        icon: 'javascript',
        namespace: 'controllers'
      },
      {
        path: path.join(this.location.project, this.location.parent, 'router.js'),
        icon: 'javascript',
        namespace: 'router'
      }
    ]);

    return super.execute();
  }
}

export default RouteNavigationStrategy;
