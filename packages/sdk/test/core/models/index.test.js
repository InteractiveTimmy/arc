import * as models from '../../../dist/core/models/index';

describe('core/models/index', () => {
  describe('unit', () => {
    it('should export ArcObject', () => {
      expect.assertions(1);

      expect(models.ArcObject).toBeDefined();
    });
  });
});
