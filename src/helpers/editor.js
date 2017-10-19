'use babel';

import PathHelpers from './path';

import ControllerNavigationStrategy from '../strategies/implementations/controller';
import ComponentNavigationStrategy from '../strategies/implementations/component';
import RouteNavigationStrategy from '../strategies/implementations/route';
import UnitTestedNavigationStrategy from '../strategies/implementations/unit-tested';
import UnitTestNavigationStrategy from '../strategies/implementations/unit-test';
import IntegrationTestNavigationStrategy from '../strategies/implementations/integration-test';

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

    if (location.namespace === 'unit') {
      strategies.push(new UnitTestNavigationStrategy(location));
    }

    if (location.namespace === 'integration') {
      strategies.push(new IntegrationTestNavigationStrategy(location));
    }

    strategies.push(new UnitTestedNavigationStrategy(location));

    return [].concat.apply([], strategies.map(strategy => strategy.execute()));
  }

};

module.exports = EditorHelpers;
