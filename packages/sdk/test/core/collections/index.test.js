import * as collections from '../../../dist/core/collections/index';

describe('core/collections/index', () => {
  describe('unit', () => {
    it('should export Collection', () => {
      expect.assertions(1);

      expect(collections.Collection).toBeDefined();
    });

    it('should export List', () => {
      expect.assertions(1);

      expect(collections.List).toBeDefined();
    });
  });
});
