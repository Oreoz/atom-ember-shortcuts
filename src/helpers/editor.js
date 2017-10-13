'use babel';

import PathHelpers from './path';

import ControllerNavigationStrategy from '../strategies/implementations/controller';
import ComponentNavigationStrategy from '../strategies/implementations/component';
import RouteNavigationStrategy from '../strategies/implementations/route';
import ModelNavigationStrategy from '../strategies/implementations/model';

const path = require('path');
const fs = require('fs');

const EditorHelpers = {

  getPossibleDestinations(textEditor) {
    let strategy = null;

    let location = PathHelpers.breakdownEmberPath(textEditor.buffer.file.path);

    if (location.namespace === 'controllers') {
      strategy = new ControllerNavigationStrategy();
    } else if (location.namespace === 'routes') {
      strategy = new RouteNavigationStrategy();
    } else if (location.namespace === 'models') {
      strategy = new ModelNavigationStrategy();
    } else if (location.namespace === 'components') {
      strategy = new ComponentNavigationStrategy();
    }

    if (!strategy) return [];

    return strategy.getDestinations(location);
  }

};

module.exports = EditorHelpers;
