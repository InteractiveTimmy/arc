import List from '../../../dist/core/collections/list';
import ArcObject from '../../../dist/core/models/arc-object';

describe('core/collections/list', () => {
  describe('integration', () => {
    let list;
    let subordinates;

    beforeEach(() => {
      subordinates = [
        new ArcObject(),
        new ArcObject(),
        new ArcObject(),
      ];

      list = new List();
    });

    describe('property members', () => {
      describe('#items', () => {
        it('should be an array', () => {
          expect.assertions(1);

          expect(Array.isArray(list.items)).toBe(true);
        });
      });
    });

    describe('method members', () => {
      describe('#canLoad()', () => {
        it('should return true if the item doesn\'t exist in the collection', () => {
          expect.assertions(1);

          expect(list.canLoad(subordinates[0])).toBe(true);
        });

        it('should return false if the item does exist in the collection', () => {
          expect.assertions(1);

          list.load(subordinates[0]);
          expect(list.canLoad(subordinates[0])).toBe(false);
        });
      });

      describe('#canUnload()', () => {
        it('should return true if the item does exist in the collection', () => {
          expect.assertions(1);

          list.load(subordinates[0]);
          expect(list.canUnload(subordinates[0])).toBe(true);
        });

        it('should return false if the item doesn\'t exist in the collection', () => {
          expect.assertions(1);

          expect(list.canUnload(subordinates[0])).toBe(false);
        });
      });

      describe('#processLoad()', () => {
        it('should add the provided item to the items\' array', () => {
          expect.assertions(1);

          list.processLoad(subordinates[0]);
          expect(list.items).toContain(subordinates[0]);
        });
      });

      describe('#processUnload()', () => {
        it('should remove the provided item from the items\' array', () => {
          expect.assertions(1);

          list.load(subordinates[0]);
          list.processUnload(subordinates[0]);

          expect(list.items).not.toContain(subordinates[0]);
        });
      });

      describe('#has()', () => {
        it('should return true if the items exist in the collection', () => {
          expect.assertions(1);

          list.load(...subordinates);

          expect(list.has(...subordinates)).toBe(true);
        });

        it('should return false if the items do not exist in the collection', () => {
          expect.assertions(1);

          expect(list.has(...subordinates)).toBe(false);
        });
      });
    });
  });
});
