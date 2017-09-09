'use babel';

import { CompositeDisposable } from 'atom';
import { getActiveComponentName } from './editor-utilities';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ember-shortcuts:open-template': () => this.openCorrespondingTemplate(),
      'ember-shortcuts:open-javascript': () => this.openCorrespondingJavascript(),
      'ember-shortcuts:open-component': () => this.openSelectedComponent(),
      'ember-shortcuts:toggle-between-controller-route': () => this.toggleRouteController()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {},

  openCorrespondingTemplate() {
    console.log('open template');
    ;
  },

  openCorrespondingJavascript() {
    console.log('open javascript');
  },

  openSelectedComponent() {
    console.log(getActiveComponentName());
  },

  toggleRouteController() {
    console.log('toggle between route and controller');
  }

};
