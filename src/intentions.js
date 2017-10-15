'use babel';

import { getPossibleDestinations } from './helpers/editor';

export function getGlobalNavigationIntentions(textEditor, bufferPosition) {
  let possibleDestinations = getPossibleDestinations(textEditor);

  const classes = new Map([
    [ 'handlebars', 'icon mustache-icon medium-orange' ],
    [ 'javascript', 'icon js-icon medium-yellow' ],
    [ 'javascript-test', 'icon test-js-icon medium-green' ]
  ]);

  const titles = new Map([
    [ 'adapters', 'Navigate to the Associated Adapter' ],
    [ 'components', 'Navigate to the Associated Component' ],
    [ 'controllers', 'Navigate to the Associated Controller' ],
    [ 'helpers', 'Navigate to the Associated Helper' ],
    [ 'initializers', 'Navigate to the Associated Initializer' ],
    [ 'models', 'Navigate to the Associated Model' ],
    [ 'router', 'Navigate to the Ember Router' ],
    [ 'routes', 'Navigate to the Associated Route' ],
    [ 'serializers', 'Navigate to the Associated Serializer' ],
    [ 'services', 'Navigate to the Associated Service' ],
    [ 'templates', 'Navigate to the Associated Template' ],
    [ 'tests', 'Navigate to the Generated Test' ],
    [ 'transforms', 'Navigate to the Associated Transform' ],
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
