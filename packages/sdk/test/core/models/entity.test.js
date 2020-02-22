import ArcObject from '../../../dist/core/models/arc-object';
import Component from '../../../dist/core/models/component';
import Entity from '../../../dist/core/models/entity';

describe('core/utils/entity', () => {
  let entity;

  beforeEach(() => {
    entity = new Entity();
  });

  describe('unit', () => {
    describe('property members', () => {
      describe('#components', () => {
        it('should be an object', () => {
          expect.assertions(1);

          expect(typeof entity.components).toBe('object');
        });
      });
    });
  });

  describe('integration', () => {
    let component;

    beforeEach(() => {
      component = new Component();
    });

    describe('method members', () => {
      class CustomComponent extends Component {}

      let customComponent;

      describe('#constructor()', () => {
        it('should be an instance of an ArcObject', () => {
          expect.assertions(1);

          expect(entity).toBeInstanceOf(ArcObject);
        });
      });

      describe('#canLoad()', () => {
        it('should return true if the component can be loaded', () => {
          expect.assertions(1);

          expect(entity.canLoad(component)).toBe(true);
        });

        it('should return false if the component cannot be loaded', () => {
          expect.assertions(1);

          entity.load(component);

          expect(entity.canLoad(component)).toBe(false);
        });
      });

      describe('#canUnload()', () => {
        it('should return true if the component can be unloaded', () => {
          expect.assertions(1);

          entity.load(component);

          expect(entity.canUnload(component)).toBe(true);
        });

        it('should return false if the component cannot be unloaded', () => {
          expect.assertions(1);

          expect(entity.canUnload(component)).toBe(false);
        });
      });

      describe('#processLoad()', () => {
        it('should load the component into the entity', () => {
          expect.assertions(1);

          entity.processLoad(component);

          expect(entity.components[component.type]).toBe(component);
        })
      });

      describe('#processUnload()', () => {
        it('should unload the component from the entity', () => {
          expect.assertions(1);

          entity.load(component);

          entity.processUnload(component);

          expect(entity.components[component.type]).toBeUndefined();
        });
      });

      describe('#has()', () => {
        beforeEach(() => {
          customComponent = new CustomComponent();
        });

        it('should return true if the entity has the component types', () => {
          expect.assertions(3);

          entity.load(component, customComponent);

          expect(entity.has(Component)).toBe(true);
          expect(entity.has(CustomComponent)).toBe(true);
          expect(entity.has(Component, CustomComponent)).toBe(true);
        });

        it('should return false if the entity does not have the component types', () => {
          expect.assertions(3);

          expect(entity.has(Component)).toBe(false);
          expect(entity.has(CustomComponent)).toBe(false);
          expect(entity.has(Component, CustomComponent)).toBe(false);
        });
      });

      describe('#load()', () => {
        let canLoad;
        let processLoad;

        beforeEach(() => {
          customComponent = new CustomComponent();

          canLoad = jest.spyOn(entity, 'canLoad');
          processLoad = jest.spyOn(entity, 'processLoad');
        });

        it('should call Entity#canLoad()', () => {
          expect.assertions(3);

          entity.load(component, customComponent);

          expect(canLoad).toHaveBeenCalledTimes(2);
          expect(canLoad).toHaveBeenNthCalledWith(1, component);
          expect(canLoad).toHaveBeenNthCalledWith(2, customComponent);
        });

        it('should call Entity#processLoad() when Entity.canLoad() returns true', () => {
          expect.assertions(3);

          entity.load(component, customComponent);

          expect(processLoad).toHaveBeenCalledTimes(2);
          expect(processLoad).toHaveBeenNthCalledWith(1, component);
          expect(processLoad).toHaveBeenNthCalledWith(2, customComponent);
        });

        it('should not call Entity#processLoad() when Entity.canLoad() returns false', () => {
          expect.assertions(3);

          entity.load(component, component, customComponent, customComponent);

          expect(processLoad).toHaveBeenCalledTimes(2);
          expect(processLoad).toHaveBeenNthCalledWith(1, component);
          expect(processLoad).toHaveBeenNthCalledWith(2, customComponent);
        });
      });

      describe('#unload()', () => {
        let canUnload;
        let processUnload;

        beforeEach(() => {
          customComponent = new CustomComponent();

          canUnload = jest.spyOn(entity, 'canUnload');
          processUnload = jest.spyOn(entity, 'processUnload');
        });

        it('should call Entity#canUnload()', () => {
          expect.assertions(3);

          entity.unload(component, customComponent);

          expect(canUnload).toHaveBeenCalledTimes(2);
          expect(canUnload).toHaveBeenNthCalledWith(1, component);
          expect(canUnload).toHaveBeenNthCalledWith(2, customComponent);
        });

        it('should call Entity#processUnload() when Entity.canUnload() returns true', () => {
          expect.assertions(3);

          entity.load(component, customComponent);
          entity.unload(component, customComponent);

          expect(processUnload).toHaveBeenCalledTimes(2);
          expect(processUnload).toHaveBeenNthCalledWith(1, component);
          expect(processUnload).toHaveBeenNthCalledWith(2, customComponent);
        });

        it('should not call Entity#processUnload() when Entity.canUnload() returns false', () => {
          expect.assertions(3);

          entity.load(component, customComponent);
          entity.unload(component, component, customComponent, customComponent);

          expect(processUnload).toHaveBeenCalledTimes(2);
          expect(processUnload).toHaveBeenNthCalledWith(1, component);
          expect(processUnload).toHaveBeenNthCalledWith(2, customComponent);
        });
      });
    });
  });
});
