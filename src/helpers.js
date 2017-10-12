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

  let contextualMatches = /{{([a-z-]*)\.([a-z-]+)/.exec(activeEditorRow);
  if (contextualMatches) {
    let regex = new RegExp(`\\{\\{#.*\\|(${contextualMatches[1]})\\|`);
    let occurences = textEditor.buffer.findAllSync(regex);

    if (occurences.length > 0) {
      let parentDeclaration = textEditor.buffer.lineForRow(occurences[0].start.row);
      let parentMatches = /{{[#\/]?([a-z-\/]+)/.exec(parentDeclaration);
      let parentComponentName = parentMatches ? parentMatches[1] : '';

      let parentTemplate = path.join(applicationPath, 'templates', 'components', `${parentComponentName}.hbs`);

      fs.readFile(parentTemplate, 'utf-8', (error, data) => {
        if (data) {
          let yieldedRegex = new RegExp(`${contextualMatches[2]}=\\(component\\s['"]([a-z-\/]+)['"]\\)`);
          let yieldedMatches = yieldedRegex.exec(data);
          let yieldedComponentName = yieldedMatches ? yieldedMatches[1] : '';

          let hbs = path.join(applicationPath, 'templates', 'components', `${yieldedComponentName}.hbs`);
          let js = path.join(applicationPath, 'components', `${yieldedComponentName}.hbs`);

          console.log(hbs, js);
        }
      });
    }
  }


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
