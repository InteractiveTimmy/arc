import ArcObject from '../../../dist/core/models/arc-object';

describe('core/utils/arc-object', () => {
  let arcObject;

  beforeEach(() => {
    arcObject = new ArcObject();
  });

  describe('unit', () => {
    describe('property members', () => {
      describe('#uuid', () => {
        it('should be defined', () => {
          expect.assertions(1);

          expect(arcObject.uuid).toBeDefined();
        });
      });

      describe('#type', () => {
        it('should be a string', () => {
          expect.assertions(1);

          expect(typeof arcObject.type).toBe('string');
        });
      });
    });
  });
});
