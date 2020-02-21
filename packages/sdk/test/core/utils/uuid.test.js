import uuid from '../../../dist/core/utils/uuid';

describe('core/utils/uuid', () => {
  describe('unit', () => {
    it('should export a function', () => {
      expect.assertions(1);

      expect(uuid).toBeInstanceOf(Function);
    });

    it('should return a 32 character string', () => {
      expect.assertions(2);

      const output = uuid();

      expect(typeof output).toBe('string');
      expect(output).toHaveLength(36);
    });

    it('should return unique values', () => {
      expect.assertions(1);

      expect(uuid()).not.toBe(uuid());
    });
  });
});
