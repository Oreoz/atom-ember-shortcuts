'use babel';

let utilities = {

  _getTrimmedActiveTextEditorRowText() {
    let editor, cursor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      if (cursor = editor.getCursorBufferPosition()) {
        return editor.buffer.lineForRow(cursor.row);
      }
    }

    return '';
  },

  _getFirstComponentNameInRow() {
    let line = utilities._getTrimmedActiveTextEditorRowText();
    let matches = /{{([a-z-]*)/.exec(line);
    return matches ? matches[1] : '';
  },

  getActiveComponentName() {
    return utilities._getFirstComponentNameInRow();
  }

};

module.exports = utilities;
