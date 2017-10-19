'use babel';

import PathHelpers from '../../src/helpers/path';

describe('PathHelpers', () => {

  describe('breakdownEmberPath', () => {

    it('handles a `null` path gracefully', () => {
      let result = PathHelpers.breakdownEmberPath(null);
      expect(result).toEqual({});
    });

    it('handles an `undefined` path gracefully', () => {
      let result = PathHelpers.breakdownEmberPath(undefined);
      expect(result).toEqual({});
    });

    it('handles an empty path gracefully', () => {
      let result = PathHelpers.breakdownEmberPath('');
      expect(result).toEqual({});
    });

    it('breaks down a basic controller path', () => {
      const path = 'C:\\workspace\\some-app\\app\\controllers\\foo.js'
      let result = PathHelpers.breakdownEmberPath(path);

      expect(result).toEqual({
        project: 'C:\\workspace\\some-app',
        parent: 'app',
        namespace: 'controllers',
        optNamespace: undefined,
        optDirectories: '',
        file: 'foo',
        extension: 'js'
      });
    });

    it('breaks down a complex controller path', () => {
      const path = 'C:\\workspace\\some-app\\app\\controllers\\foo\\bar.js'
      let result = PathHelpers.breakdownEmberPath(path);

      expect(result).toEqual({
        project: 'C:\\workspace\\some-app',
        parent: 'app',
        namespace: 'controllers',
        optNamespace: undefined,
        optDirectories: 'foo\\',
        file: 'bar',
        extension: 'js'
      });
    });

    it('breaks down a more complex controller path', () => {
      const path = 'C:\\workspace\\some-app\\app\\controllers\\foo\\bar\\baz.js'
      let result = PathHelpers.breakdownEmberPath(path);

      expect(result).toEqual({
        project: 'C:\\workspace\\some-app',
        parent: 'app',
        namespace: 'controllers',
        optNamespace: undefined,
        optDirectories: 'foo\\bar\\',
        file: 'baz',
        extension: 'js'
      });
    });

    it('breaks down a component template path', () => {
      const path = 'C:\\workspace\\some-app\\app\\templates\\components\\baz.js'
      let result = PathHelpers.breakdownEmberPath(path);

      expect(result).toEqual({
        project: 'C:\\workspace\\some-app',
        parent: 'app',
        namespace: 'templates',
        optNamespace: 'components',
        optDirectories: '\\',
        file: 'baz',
        extension: 'js'
      });
    });

    it('breaks down a complex component template path', () => {
      const path = 'C:\\workspace\\some-app\\app\\templates\\components\\foo\\bar\\baz.js'
      let result = PathHelpers.breakdownEmberPath(path);

      expect(result).toEqual({
        project: 'C:\\workspace\\some-app',
        parent: 'app',
        namespace: 'templates',
        optNamespace: 'components',
        optDirectories: '\\foo\\bar\\',
        file: 'baz',
        extension: 'js'
      });
    });

  });

});
