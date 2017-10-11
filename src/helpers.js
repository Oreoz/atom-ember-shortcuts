'use babel';

const path = require('path');
const fs = require('fs');

export function getPossibleIntentions(textEditor, bufferPosition) {
  let intentions = [];

  let activeFilePath = textEditor.buffer.file.path;
  let applicationMatches = /.*[\/\\](app|addon)[\/\\]/.exec(activeFilePath);
  let applicationPath = applicationMatches ? applicationMatches[0] : '';

  if (!applicationPath) {
    console.log('[INFO] Ember Shortcuts: Currently not located in an Ember application.');
    return intentions;
  }

  let activeEditorRow = textEditor.buffer.lineForRow(bufferPosition.row);
  let componentMatches = /{{[#\/]?([a-z-\/]+)/.exec(activeEditorRow);
  let componentName = componentMatches ? componentMatches[1] : '';

  if (componentName) {
    let cleanedComponentName = componentName.replace('/', '\\');

    let hbs = path.join(applicationPath, 'templates', 'components', `${cleanedComponentName}.hbs`);
    if (fs.existsSync(hbs)) {
      intentions.push({
        priority: 100,
        class: 'icon mustache-icon medium-orange',
        title: 'Navigate to Template',
        selected: () => {
          atom.workspace.open(hbs, { searchAllPanes: true });
        }
      });
    }

    let js = path.join(applicationPath, 'components', `${cleanedComponentName}.js`);
    if (fs.existsSync(js)) {
      intentions.push({
        priority: 200,
        class: 'icon js-icon medium-yellow',
        title: 'Navigate to Definition',
        selected: () => {
          atom.workspace.open(js, { searchAllPanes: true });
        }
      });
    }
  }

  return intentions;
}
