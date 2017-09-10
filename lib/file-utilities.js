'use babel';

const fs = require('fs');
const path = require('path');

let fileUtilities = {

  _breakdownEmberPath(filePath) {
    let pattern = /^.*(app|addon)\\([a-z-]+)\\.*?(components)?(.*?)([a-z-]*)[.]([a-z]*)$/;
    let matches = pattern.exec(filePath);

    if (matches) {
      return [
        matches[5], // File Name
        matches[6], // Extension
        matches[2], // Namespace
        matches[3], // Optional Namespace
        matches[4]  // Optional Extra Folders
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

  openTestRelatedToActiveFile() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let applicationPath = fileUtilities._getApplicationPath();

    let [ fileName, extension, namespace, optNamespace, optExtraFolders ] = fileUtilities._breakdownEmberPath(currentFilePath);

    // component.hbs or component.js -> integration-test.js
    if ((namespace === 'templates' && optNamespace === 'components') || namespace === 'components') {
      let modifiedApplicationPath = applicationPath.replace('addon', 'tests').replace('app', 'tests');
      let destination = path.join(modifiedApplicationPath, 'integration', 'components', optExtraFolders, `${fileName}-test.js`);
      fileUtilities._openFile(destination);
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

    let [ fileName, extension, namespace, optNamespace, optExtraFolders ] = fileUtilities._breakdownEmberPath(currentFilePath);

    if ((namespace === 'controllers' || namespace === 'routes') && extension === 'js') {
      let destinationNamespace = namespace === 'controllers' ? 'routes' : 'controllers';
      fileUtilities._openFile(path.join(applicationPath, destinationNamespace, optExtraFolders, `${fileName}.js`));
    }
  }

};

module.exports = fileUtilities;
