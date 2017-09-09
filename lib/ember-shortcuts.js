'use babel';

import { CompositeDisposable } from 'atom';
import { firstHandlebarsComponentInLine } from './editor-utilities';
import { openComponent, openJavascript, openHandlebars } from './file-utilities';

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
    openHandlebars();
  },

  openCorrespondingJavascript() {
    openJavascript();
  },

  openSelectedComponent() {
    let componentName = firstHandlebarsComponentInLine();
    openComponent(componentName);
  },

  toggleRouteController() {
    console.log('toggle between route and controller');
  }

};
