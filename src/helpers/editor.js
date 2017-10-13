'use babel';

import PathHelpers from './path';

import ControllerNavigationStrategy from '../strategies/implementations/controller';
import ComponentNavigationStrategy from '../strategies/implementations/component';
import RouteNavigationStrategy from '../strategies/implementations/route';
import UnitTestNavigationStrategy from '../strategies/implementations/unit-test';

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
    } else if (
      location.namespace === 'adapters' ||
      location.namespace === 'helpers' ||
      location.namespace === 'initializers' ||
      location.namespace === 'models' ||
      location.namespace === 'serializers' ||
      location.namespace === 'services' ||
      location.namespace === 'transforms'
    ) {
      strategy = new UnitTestNavigationStrategy();
    } else if (location.namespace === 'components') {
      strategy = new ComponentNavigationStrategy();
    }

    if (!strategy) return [];

    return strategy.getDestinations(location);
  }

};

module.exports = EditorHelpers;
