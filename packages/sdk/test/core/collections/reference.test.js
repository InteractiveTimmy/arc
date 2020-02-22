import Reference from '../../../dist/core/collections/reference';
import ArcObject from '../../../dist/core/models/arc-object';

describe('core/collections/reference', () => {
  describe('integration', () => {
    let index;
    let reference;
    let subordinates;

    beforeEach(() => {
      subordinates = [
        new ArcObject(),
        new ArcObject(),
        new ArcObject(),
      ];

      index = 'uuid';
      reference = new Reference(index);
    });

    describe('property members', () => {
      describe('#items', () => {
        it('should be an object', () => {
          expect.assertions(1);

          expect(typeof reference.items).toBe('object');
        });
      });

      describe('#index', () => {
        it('should be a string', () => {
          expect.assertions(1);

          expect(typeof reference.index).toBe('string');
        });
      });
    });

    describe('method members', () => {
      describe('#canLoad()', () => {
        it('should return true if the item doesn\'t exist in the collection', () => {
          expect.assertions(1);

          expect(reference.canLoad(subordinates[0])).toBe(true);
        });

        it('should return false if the item does exist in the collection', () => {
          expect.assertions(1);

          reference.load(subordinates[0]);
          expect(reference.canLoad(subordinates[0])).toBe(false);
        });
      });

      describe('#canUnload()', () => {
        it('should return true if the item does exist in the collection', () => {
          expect.assertions(1);

          reference.load(subordinates[0]);
          expect(reference.canUnload(subordinates[0])).toBe(true);
        });

        it('should return false if the item doesn\'t exist in the collection', () => {
          expect.assertions(1);

          expect(reference.canUnload(subordinates[0])).toBe(false);
        });
      });

      describe('#processLoad()', () => {
        it('should add the provided item to the items\' object', () => {
          expect.assertions(1);

          reference.processLoad(subordinates[0]);
          expect(reference.items[subordinates[0][index]]).toBe(subordinates[0]);
        });
      });

      describe('#processUnload()', () => {
        it('should remove the provided item from the items\' array', () => {
          expect.assertions(1);

          reference.load(subordinates[0]);
          reference.processUnload(subordinates[0]);

          expect(reference.items[subordinates[0][index]]).toBeUndefined();
        });
      });

      describe('#get()', () => {
        it('should return the item associated with the provided index value', () => {
          expect.assertions(1);

          reference.load(subordinates[0]);

          expect(reference.get(subordinates[0][index])).toBe(subordinates[0]);
        });

        it('should return undefined if no item is found with the provided index value', () => {
          expect.assertions(1);

          expect(reference.get(subordinates[0][index])).toBeUndefined();
        });
      });

      describe('#has()', () => {
        it('should return true if the items exist in the collection', () => {
          expect.assertions(1);

          reference.load(...subordinates);

          expect(reference.has(...subordinates)).toBe(true);
        });

        it('should return false if the items do not exist in the collection', () => {
          expect.assertions(1);

          expect(reference.has(...subordinates)).toBe(false);
        });
      });

      describe('#list()', () => {
        it('should return an array of all the items in the items\' record', () => {
          expect.assertions(3);

          reference.load(...subordinates);

          const list = reference.list();

          expect(Array.isArray(list)).toBe(true);
          expect(list).toHaveLength(subordinates.length);
          expect(list).toStrictEqual(expect.arrayContaining(subordinates));
        });
      });
    });
  });
});
