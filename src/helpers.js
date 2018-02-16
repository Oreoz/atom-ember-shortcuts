'use babel';

const path = require('path');
const fs = require('fs');

export function getEmberPath(textEditor) {
  let currentFilePath = textEditor.buffer.file.path;
  let matches = /.*[\/\\](app|addon)[\/\\]/.exec(currentFilePath);
  let path = matches ? matches[0] : '';

  if (!path) {
    console.log('[INFO] Ember Shortcuts: Currently not located in an Ember application.');
    return null;
  }

  return path;
}

export function getIntentions(textEditor, bufferPosition) {
  let intentions = [];

  let activeFilePath = textEditor.buffer.file.path;
  let applicationMatches = /.*[\/\\](app|addon)[\/\\]/.exec(activeFilePath);
  let applicationPath = applicationMatches ? applicationMatches[0] : '';

  if (!applicationPath) {
    console.log('[INFO] Ember Shortcuts: Currently not located in an Ember application.');
    return intentions;
  }

  let activeEditorRow = textEditor.buffer.lineForRow(bufferPosition.row);
  let componentMatches = /{{[#\/]?([a-z0-9-\/]+)/.exec(activeEditorRow);
  let componentName = componentMatches ? componentMatches[1] : '';

  let contextualMatches = /{{([a-z0-9-]*)\.([a-z0-9-]+)/.exec(activeEditorRow);
  if (contextualMatches) {
    let regex = new RegExp(`{{#([a-z0-9-\\/]*)(?=[^\\}]*?\\|${contextualMatches[1]}\\|)`);
    let occurences = textEditor.buffer.findAllSync(regex);

    if (occurences.length > 0) {
      let parentDeclaration = textEditor.buffer.lineForRow(occurences[0].start.row);
      let parentMatches = /{{[#\/]?([a-z0-9-\/]+)/.exec(parentDeclaration);
      let parentComponentName = parentMatches ? parentMatches[1] : '';

      let parentTemplate = path.join(applicationPath, 'templates', 'components', `${parentComponentName}.hbs`);

      let data = fs.readFileSync(parentTemplate, { encoding: 'utf-8' });

      if (data) {
        let yieldedRegex = new RegExp(`${contextualMatches[2]}\\s*=\\s*\\(component\\s*'([a-z0-9-\\/]*)'`);
        let yieldedMatches = yieldedRegex.exec(data);
        let yieldedComponentName = yieldedMatches ? yieldedMatches[1] : '';

        let hbs = path.join(applicationPath, 'templates', 'components', `${yieldedComponentName}.hbs`);
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

        let js = path.join(applicationPath, 'components', `${yieldedComponentName}.js`);
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
