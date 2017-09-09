'use babel';

const fs = require('fs');

let fileUtilities = {

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

  _getTypeAndNameOfTemplate() {
    let currentFilePath = fileUtilities._getCurrentFilePath();
    let matches = /.*[\/\\]app[\/\\].*(templates|components).*[\/\\]([a-z-]+).*[.hbs]/.exec(currentFilePath);
    if (matches) {
      return [ matches[1], matches[2] ];
    }
    return '';
  },

  openComponent(componentName) {
    if (componentName) {
      let applicationPath = fileUtilities._getApplicationPath();

      if (applicationPath) {
        let relativeTemplatePath = `templates\\components\\${componentName}.hbs`;
        let absoluteComponentPath = applicationPath + relativeTemplatePath;

        if (fs.existsSync(absoluteComponentPath)) {
          atom.workspace.open(absoluteComponentPath, { searchAllPanes: true });
        }
      }
    }
  },

  openJavascript() {
    let typeAndName = fileUtilities._getTypeAndNameOfTemplate();
    let applicationPath = fileUtilities._getApplicationPath();

    if (typeAndName[0] === 'components' && applicationPath) {
      let relativeComponentPath = `components\\${typeAndName[1]}.js`;
      let absoluteComponentPath = applicationPath + relativeComponentPath;

      if (fs.existsSync(absoluteComponentPath)) {
        atom.workspace.open(absoluteComponentPath, { searchAllPanes: true });
      }
    }
  },

  openHandlebars() {

  }

};

module.exports = fileUtilities;
