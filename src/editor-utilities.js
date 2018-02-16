'use babel';

let editorUtilities = {

  _getActiveTextEditorLine() {
    let editor, cursor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      if (cursor = editor.getCursorBufferPosition()) {
        return editor.buffer.lineForRow(cursor.row);
      }
    }

    return '';
  },

  firstHandlebarsComponentInLine() {
    let line = editorUtilities._getActiveTextEditorLine();
    let matches = /{{[#\/]?([a-z0-9-\/]+)/.exec(line);
    return matches ? matches[1] : '';
  }

};

module.exports = editorUtilities;
