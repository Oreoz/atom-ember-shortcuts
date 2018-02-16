'use babel';

const fs = require('fs');
const path = require('path');

let fileUtilities = {

  _breakdownEmberPath(filePath) {
    let pattern = /^(.*)\\(app|addon|tests)\\([a-z0-9-]+)\\.*?(components)?(.*?)([a-z0-9-]*)[.]([a-z]*)$/;
    let matches = pattern.exec(filePath);

    if (matches) {
      return [
        matches[1], // Ember Project Root
        matches[2], // Location (app, addon or tests)
        matches[3], // Namespace
        matches[4], // Optional Namespace
        matches[5], // Optional Extra Folders
        matches[6], // File Name
        matches[7]  // Extension
      ];
    }
    return [];
  },

  _openFile(path) {
    if (fs.existsSync(path)) {
      atom.workspace.open(path, { searchAllPanes: true });
    }
  },

  _getCurrentFilePath() {
    let currentFilePath;

    if (editor = atom.workspace.getActiveTextEditor()) {
      if (file = editor.buffer.file) {
        return file.path;
      }
    }
    return '';
  },

  _getApplicationPath() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let matches = /.*[\/\\](app|addon)[\/\\]/.exec(currentFilePath);
    return matches ? matches[0] : '';
  },

  openComponent(componentName) {
    if (componentName) {
      let applicationPath = fileUtilities._getApplicationPath();
      fileUtilities._openFile(path.join(applicationPath, 'templates', 'components', `${componentName.replace('/', '\\')}.hbs`));
    }
  },

  toggleBetweenTestAndTarget() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ root, location, namespace, optNamespace, optExtraFolders, fileName, extension ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // component.hbs or component.js -> integration-test.js
    if ((namespace === 'templates' && optNamespace === 'components') || namespace === 'components') {
      let modifiedApplicationPath = applicationPath.replace('addon', 'tests').replace('app', 'tests');
      let integrationTest = path.join(modifiedApplicationPath, 'integration', 'components', optExtraFolders, `${fileName}-test.js`);
      fileUtilities._openFile(integrationTest);
    }

    // integration-test.js -> component.js
    else if (location === 'tests' && namespace === 'integration' && optNamespace === 'components') {
      let modifiedFileName = fileName.replace('-test', '');
      let addonPath = path.join(root, 'addon', 'components', optExtraFolders, `${modifiedFileName}.js`);

      if (fs.existsSync(addonPath)) {
        fileUtilities._openFile(addonPath); // addon
      } else {
        let appPath = path.join(root, 'app', 'components', optExtraFolders, `${modifiedFileName}.js`);
        fileUtilities._openFile(appPath); // app
      }
    }

    // model.js -> unit-test.js
    // controller.js -> unit-test.js
    // route.js -> unit-test.js
    // service.js -> unit-test.js
    // helper.js -> unit-test.js
    else if (['models', 'controllers', 'routes', 'services', 'helpers'].includes(namespace)) {
      let modifiedApplicationPath = applicationPath.replace('addon', 'tests').replace('app', 'tests');
      let unitTest = path.join(modifiedApplicationPath, 'unit', namespace, optExtraFolders, `${fileName}-test.js`);
      fileUtilities._openFile(unitTest);
    }
  },

  toggleBetweenJavascriptAndTemplate() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    console.log(currentFilePath);

    let [ root, location, namespace, optNamespace, optExtraFolders, fileName, extension ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // component.hbs -> component.js
    if (namespace === 'templates' && optNamespace === 'components' && extension === 'hbs') {
      let component = path.join(applicationPath, 'components', optExtraFolders, `${fileName}.js`);
      fileUtilities._openFile(component);
    }

    // component.js -> component.hbs
    else if (namespace === 'components' && extension === 'js') {
      let template = path.join(applicationPath, 'templates', 'components', optExtraFolders, `${fileName}.hbs`);
      fileUtilities._openFile(template);
    }

    // route.js -> template.hbs
    // controller.js -> template.hbs
    else if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      let template = path.join(applicationPath, 'templates', optExtraFolders, `${fileName}.hbs`);
      fileUtilities._openFile(template);
    }

    // template.hbs -> controller.js
    else if (namespace === 'templates' && extension === 'hbs') {
      let controller = path.join(applicationPath, 'controllers', optExtraFolders, `${fileName}.js`);
      fileUtilities._openFile(controller);
    }
  },

  toggleBetweenControllerAndRoute() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ root, location, namespace, optNamespace, optExtraFolders, fileName, extension ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // controller.js -> route.js
    // template.hbs -> route.js
    if ((namespace === 'controllers' && extension === 'js') || (namespace === 'templates' && extension === 'hbs')) {
      let route = path.join(applicationPath, 'routes', optExtraFolders, `${fileName}.js`);
      fileUtilities._openFile(route);
    }

    // route.js -> controller.js
    else if (namespace === 'routes' && extension === 'js') {
      let controller = path.join(applicationPath, 'controllers', optExtraFolders, `${fileName}.js`);
      fileUtilities._openFile(controller);
    }
  }

};

module.exports = fileUtilities;
