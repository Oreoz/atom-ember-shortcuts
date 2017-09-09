'use babel';

const fs = require('fs');

let fileUtilities = {

  _getApplicationPath() {
    let currentFilePath;

    if (editor = atom.workspace.getActiveTextEditor()) {
      if (file = editor.buffer.file) {
        let matches = /.*[\/\\]app[\/\\]/.exec(file.path);
        return matches ? matches[0] : '';
      }
    }
    return '';
  },

  openComponentInTextEditor(componentName) {
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
  }

};

module.exports = fileUtilities;
