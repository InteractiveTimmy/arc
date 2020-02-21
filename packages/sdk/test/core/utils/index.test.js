import * as utils from '../../../dist/core/utils/index';

describe('core/utils/index', () => {
  describe('unit', () => {
    it('should export uuid', () => {
      expect.assertions(1);

      expect(utils.uuid).toBeDefined();
    });
  });
});
