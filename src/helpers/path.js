'use babel';

const PathHelpers = {

  getEmberPath(textEditor) {
    let currentFilePath = textEditor.buffer.file.path;
    let matches = /.*[\/\\](app|addon)[\/\\]/.exec(currentFilePath);
    let path = matches ? matches[0] : '';

    if (!path) {
      console.log('[INFO] Ember Shortcuts: Currently not located in an Ember application.');
      return null;
    }

    return path;
  },

  breakdownEmberPath(path) {
    let pattern = /^(.*)\\(app|addon|tests)\\([a-z0-9-]+)\\.*?(components)?(.*?)([a-z0-9-]*)[.]([a-z]*)$/;
    let matches = pattern.exec(path);

    return matches ?
      {
        project: matches[1], // Ember Project Root
        parent: matches[2], // Location (app, addon or tests)
        namespace: matches[3], // Namespace
        optNamespace: matches[4], // Optional Namespace
        optDirectories: matches[5], // Optional Extra Folders
        file: matches[6], // File Name
        extension: matches[7]  // Extension
      } : { };
  }

};

module.exports = PathHelpers;
