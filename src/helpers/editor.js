'use babel';

import PathHelpers from './path';

import ControllerNavigationStrategy from '../strategies/implementations/controller';
import ComponentNavigationStrategy from '../strategies/implementations/component';
import RouteNavigationStrategy from '../strategies/implementations/route';
import UnitTestedNavigationStrategy from '../strategies/implementations/unit-tested';

const path = require('path');
const fs = require('fs');

const EditorHelpers = {

  getPossibleDestinations(textEditor) {
    let strategies = [];

    let location = PathHelpers.breakdownEmberPath(textEditor.buffer.file.path);

    if (location.namespace === 'controllers') {
      strategies.push(new ControllerNavigationStrategy(location));
    }

    if (location.namespace === 'routes') {
      strategies.push(new RouteNavigationStrategy(location));
    }

    if (location.namespace === 'components') {
      strategies.push(new ComponentNavigationStrategy(location));
    }

    if (
      location.namespace === 'adapters' ||
      location.namespace === 'controllers' ||
      location.namespace === 'helpers' ||
      location.namespace === 'initializers' ||
      location.namespace === 'models' ||
      location.namespace === 'routes' ||
      location.namespace === 'serializers' ||
      location.namespace === 'services' ||
      location.namespace === 'transforms'
    ) {
      strategies.push(new UnitTestedNavigationStrategy(location));
    }

    return [].concat.apply([], strategies.map(strategy => strategy.execute()));

  }

};

module.exports = EditorHelpers;
