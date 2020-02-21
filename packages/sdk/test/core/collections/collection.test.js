import Collection from '../../../dist/core/collections/collection';
import ArcObject from '../../../dist/core/models/arc-object';

describe('core/utils/collection', () => {
  describe('integration', () => {
    let collection;
    let superior;
    let subordinates;

    beforeEach(() => {
      superior = new ArcObject();
      subordinates = [
        new ArcObject(),
        new ArcObject(),
        new ArcObject(),
      ];

      collection = new Collection(superior);
    });

    describe('property members', () => {
      describe('#superior', () => {
        it('should be the provided superior parameter', () => {
          expect.assertions(1);

          expect(collection.superior).toBe(superior);
        });
      });
    });

    describe('method members', () => {
      describe('#load()', () => {
        beforeEach(() => {
          collection.canLoad = () => undefined;
          collection.processLoad = () => undefined;
        });

        it('should return itself', () => {
          expect.assertions(1);

          expect(collection.load()).toBe(collection);
        });

        it('should call Collection#canLoad() for each item', () => {
          expect.assertions(4);

          const spy = jest.spyOn(collection, 'canLoad');

          collection.load(...subordinates);

          expect(spy).toHaveBeenCalledTimes(subordinates.length);
          expect(spy).toHaveBeenNthCalledWith(1, subordinates[0]);
          expect(spy).toHaveBeenNthCalledWith(2, subordinates[1]);
          expect(spy).toHaveBeenNthCalledWith(3, subordinates[2]);
        });

        it('should call Collection#processLoad() with each valid item', () => {
          expect.assertions(4);

          collection.canLoad = () => true;

          const spy = jest.spyOn(collection, 'processLoad');

          collection.load(...subordinates);

          expect(spy).toHaveBeenCalledTimes(subordinates.length);
          expect(spy).toHaveBeenNthCalledWith(1, subordinates[0]);
          expect(spy).toHaveBeenNthCalledWith(2, subordinates[1]);
          expect(spy).toHaveBeenNthCalledWith(3, subordinates[2]);
        });

        it('should not call Collection#processUnload() for invalid items', () => {
          expect.assertions(1);

          collection.canLoad = () => false;

          const spy = jest.spyOn(collection, 'processLoad');

          collection.load(...subordinates);

          expect(spy).toHaveBeenCalledTimes(0);
        });
      });

      describe('#unload()', () => {
        beforeEach(() => {
          collection.canUnload = () => undefined;
          collection.processUnload = () => undefined;
        });

        it('should return itself', () => {
          expect.assertions(1);

          expect(collection.unload()).toBe(collection);
        });

        it('should call Collection#canUnload() for each item', () => {
          expect.assertions(4);

          const spy = jest.spyOn(collection, 'canUnload');

          collection.unload(...subordinates);

          expect(spy).toHaveBeenCalledTimes(subordinates.length);
          expect(spy).toHaveBeenNthCalledWith(1, subordinates[0]);
          expect(spy).toHaveBeenNthCalledWith(2, subordinates[1]);
          expect(spy).toHaveBeenNthCalledWith(3, subordinates[2]);
        });

        it('should call Collection#processUnload() with valid items', () => {
          expect.assertions(4);

          collection.canUnload = () => true;

          const spy = jest.spyOn(collection, 'processUnload');

          collection.unload(...subordinates);

          expect(spy).toHaveBeenCalledTimes(subordinates.length);
          expect(spy).toHaveBeenNthCalledWith(1, subordinates[0]);
          expect(spy).toHaveBeenNthCalledWith(2, subordinates[1]);
          expect(spy).toHaveBeenNthCalledWith(3, subordinates[2]);
        });

        it('should not call Collection#processUnload() for invalid items', () => {
          expect.assertions(1);

          collection.canUnload = () => false;

          const spy = jest.spyOn(collection, 'processUnload');

          collection.unload(...subordinates);

          expect(spy).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
