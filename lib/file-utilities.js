'use babel';

const fs = require('fs');
const path = require('path');

let fileUtilities = {

  _breakdownEmberPath(filePath) {
    let pattern = /^(.*)\\(app|addon|tests)\\([a-z-]+)\\.*?(components)?(.*?)([a-z-]*)[.]([a-z]*)$/;
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
      let destination = path.join(modifiedApplicationPath, 'integration', 'components', optExtraFolders, `${fileName}-test.js`);
      fileUtilities._openFile(destination);
    }

    // integration-test.js -> component.js
    else if (location === 'tests' && namespace === 'integration' && optNamespace === 'components') {
      let modifiedFileName = fileName.replace('-test', '');
      let destination1 = path.join(root, 'addon', 'components', optExtraFolders, `${modifiedFileName}.js`);
      let destination2 = path.join(root, 'app', 'components', optExtraFolders, `${modifiedFileName}.js`);

      fileUtilities._openFile(destination1); // addon
      fileUtilities._openFile(destination2); // app
    }
  },

  toggleBetweenJavascriptAndTemplate() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    console.log(currentFilePath);

    let [ root, location, namespace, optNamespace, optExtraFolders, fileName, extension ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // component.hbs -> component.js
    if (namespace === 'templates' && optNamespace === 'components' && extension === 'hbs') {
      fileUtilities._openFile(path.join(applicationPath, 'components', optExtraFolders, `${fileName}.js`));
    }

    // component.js -> component.hbs
    else if (namespace === 'components' && extension === 'js') {
      fileUtilities._openFile(path.join(applicationPath, 'templates', 'components', optExtraFolders, `${fileName}.hbs`));
    }

    // route.js or controller.js -> template.hbs
    else if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      fileUtilities._openFile(path.join(applicationPath, 'templates', optExtraFolders, `${fileName}.hbs`));
    }

    // template.hbs -> controller.js
    else if (namespace === 'templates' && extension === 'hbs') {
      fileUtilities._openFile(path.join(applicationPath, 'controllers', optExtraFolders, `${fileName}.js`));
    }
  },

  toggleBetweenControllerAndRoute() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ root, location, namespace, optNamespace, optExtraFolders, fileName, extension ] = fileUtilities._breakdownEmberPath(currentFilePath);

    if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      let destinationNamespace = namespace === 'controllers' ? 'routes' : 'controllers';
      fileUtilities._openFile(path.join(applicationPath, destinationNamespace, optExtraFolders, `${fileName}.js`));
    }
  }

};

module.exports = fileUtilities;
