'use babel';

import { getPossibleDestinations } from './helpers/editor';

export function getGlobalNavigationIntentions(textEditor, bufferPosition) {
  let possibleDestinations = getPossibleDestinations(textEditor);

  const classes = new Map([
    [ 'javascript', 'icon js-icon medium-yellow' ],
    [ 'handlebars', 'icon mustache-icon medium-orange' ],
    [ 'javascript-test', 'icon test-js-icon medium-green' ]
  ]);

  const titles = new Map([
    [ 'routes', 'Navigate to the Associated Route' ],
    [ 'controllers', 'Navigate to the Associated Controller' ],
    [ 'templates', 'Navigate to the Associated Template' ],
    [ 'tests', 'Navigate to the Generated Test' ],
    [ 'router', 'Navigate to the Ember Router' ],
  ]);

  return possibleDestinations.map(destination => ({
    priority: 100,
    class: classes.get(destination.icon),
    title: titles.get(destination.namespace),
    selected: () => {
      atom.workspace.open(destination.path, { searchAllPanes: true });
    }
  }));
}
