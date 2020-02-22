import ArcObject from '../../../dist/core/models/arc-object';
import Component from '../../../dist/core/models/component';

describe('core/utils/component', () => {
  let component;

  beforeEach(() => {
    component = new Component();
  });

  describe('integration', () => {
    describe('method members', () => {
      describe('#constructor()', () => {
        it('should be an instance of an ArcObject', () => {
          expect.assertions(1);

          expect(component).toBeInstanceOf(ArcObject);
        });
      });
    });
  });
});
