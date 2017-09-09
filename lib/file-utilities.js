'use babel';

const fs = require('fs');
const path = require('path');

let fileUtilities = {

  _breakdownEmberPath(filePath) {
    let pattern = /^.*app\\([a-z-]+)\\.*?(components)?(.*?)([a-z-]*)[.]([a-z]*)$/;
    let matches = pattern.exec(filePath);

    if (matches) {
      // File Name - Extension - Namespace - Optional Namespace - Optional Extra Folders
      return [ matches[4], matches[5], matches[1], matches[2], matches[3] ];
    }
    return [];
  },

  _openFile(path) {
    console.log(`Open file: '${path}'`);
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
    let matches = /.*[\/\\]app[\/\\]/.exec(currentFilePath);
    return matches ? matches[0] : '';
  },

  openComponent(componentName) {
    if (componentName) {
      let applicationPath = fileUtilities._getApplicationPath();
      fileUtilities._openFile(path.join(applicationPath, 'templates', 'components', `${componentName.replace('/', '\\')}.hbs`));
    }
  },

  toggleBetweenJavascriptAndTemplate() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ fileName, extension, namespace, optNamespace, optExtraFolders ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // component.hbs -> component.js
    if (namespace === 'templates' && optNamespace === 'components' && extension === 'hbs') {
      fileUtilities._openFile(path.join(applicationPath, 'components', optExtraFolders, `${fileName}.js`));
    }

    // component.js -> component.hbs
    if (namespace === 'components' && extension === 'js') {
      fileUtilities._openFile(path.join(applicationPath, 'templates', 'components', optExtraFolders, `${fileName}.hbs`));
    }

    // route.js or controller.js -> template.hbs
    if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      fileUtilities._openFile(path.join(applicationPath, 'templates', optExtraFolders, `${fileName}.hbs`));
    }

    // template.hbs -> controller.js
    if (namespace === 'templates' && extension === 'hbs') {
      fileUtilities._openFile(path.join(applicationPath, 'controllers', optExtraFolders, `${fileName}.js`));
    }
  },

  toggleBetweenControllerAndRoute() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ fileName, extension, namespace, optNamespace, optExtraFolders ] = fileUtilities._breakdownEmberPath(currentFilePath);

    if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      let destinationNamespace = namespace === 'controllers' ? 'routes' : 'controllers';
      fileUtilities._openFile(path.join(applicationPath, destinationNamespace, optExtraFolders, `${fileName}.js`));
    }
  }

};

module.exports = fileUtilities;
