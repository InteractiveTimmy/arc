import ArcObject from '../../../dist/core/models/arc-object';
import Scene from '../../../dist/core/models/scene';
import System from '../../../dist/core/models/system';

describe('core/utils/system', () => {
  let system;

  beforeEach(() => {
    system = new System();
  });

  describe('unit', () => {
    describe('property members', () => {
      describe('#active', () => {
        it('should be a false boolean', () => {
          expect.assertions(1);

          expect(system.active).toBe(false);
        });
      });

      describe('#dt', () => {
        it('should be 0', () => {
          expect.assertions(1);

          expect(system.dt).toBe(0);
        });
      });

      describe('#ts', () => {
        it('should be 0', () => {
          expect.assertions(1);

          expect(system.ts).toBe(0);
        });
      });
    });
  });

  describe('integration', () => {
    let scene;

    beforeEach(() => {
      scene = new Scene();
    });

    afterEach(() => {
      system.active = false;
    });

    describe('method members', () => {
      describe('#constructor()', () => {
        it('should extend ArcObject', () => {
          expect.assertions(1);

          expect(system).toBeInstanceOf(ArcObject);
        });
      });

      describe('#mount()', () => {
        it('should assign the scene to the system', () => {
          expect.assertions(1);

          system.mount(scene);

          expect(system.scene).toBe(scene);
        });

        it('should unassign a scene if it already exists on the system', () => {
          expect.assertions(1);

          const otherScene = new Scene();

          system.mount(scene);
          system.mount(otherScene);

          expect(system.scene).not.toBe(scene);
        });

        it('should call Scene#unmount()', () => {
          expect.assertions(1);

          system.scene = scene;
          const unmount = jest.spyOn(scene, 'unmount');

          system.mount(scene);

          expect(unmount).toHaveBeenCalledWith(system);
        });

        it('should return itself', () => {
          expect.assertions(1);

          expect(system.mount()).toBe(system);
        });
      });

      describe('#start()', () => {
        it('should set active to true', () => {
          expect.assertions(1);

          system.start();

          expect(system.active).toBe(true);
        });

        it('should set ts to a number value', () => {
          expect.assertions(1);

          system.start();

          expect(typeof system.ts).toBe('number');
        });

        it('should call System#step()', () => new Promise(
          (resolve) => {
            expect.assertions(1);

            const step = jest.spyOn(system, 'step');

            system.start();

            setTimeout(() => {
              expect(step).toHaveBeenCalledWith();
              resolve();
            }, 10);
          },
        ));

        it('should return itself', () => {
          expect.assertions(1);

          expect(system.start()).toBe(system);
        });
      });

      describe('#step()', () => {
        it('should not proceed through events if active is falsed', () => {
          expect.assertions(3);

          const { dt, ts } = system;

          expect(system.step()).toBeUndefined();
          expect(system.dt).toBe(dt);
          expect(system.ts).toBe(ts);
        });

        describe('when the system is active', () => {
          beforeEach(() => {
            system.active = true;
          });

          it('should set the dt value', () => {
            expect.assertions(1);

            const { dt } = system;

            system.step();

            expect(system.dt).not.toBe(dt);
          });

          it('should set the ts value', () => {
            expect.assertions(1);

            const { ts } = system;

            system.step();

            expect(system.ts).not.toBe(ts);
          });

          it('should call System#onStep()', () => {
            expect.assertions(1);

            system.onStep = () => undefined;
            const onStep = jest.spyOn(system, 'onStep');

            system.step();

            expect(onStep).toHaveBeenCalledWith();
          });

          it('should call System#step() recursively', () => new Promise(
            (resolve) => {
              expect.assertions(1);

              system.step();

              const step = jest.spyOn(system, 'step');

              setTimeout(() => {
                expect(step).toHaveBeenCalledWith();
                resolve();
              }, 10);
            },
          ));
        });
      });

      describe('#stop()', () => {
        it('should set active to false', () => {
          expect.assertions(1);

          system.active = true;

          system.stop();

          expect(system.active).toBe(false);
        });

        it('should return itself', () => {
          expect.assertions(1);

          expect(system.stop()).toBe(system);
        });
      });

      describe('#unmount()', () => {
        it('should set the current scene to undefined', () => {
          expect.assertions(1);

          system.scene = scene;

          system.unmount();

          expect(system.scene).toBeUndefined();
        });

        it('should call Scene#unmount() with itself when mounted', () => {
          expect.assertions(1);

          system.scene = scene;
          const unmount = jest.spyOn(scene, 'unmount');

          system.unmount();

          expect(unmount).toHaveBeenCalledWith(system);
        });

        it('should not call Scene#unmount() if not mounted', () => {
          expect.assertions(1);

          const unmount = jest.spyOn(scene, 'unmount');

          system.unmount();

          expect(unmount).toHaveBeenCalledTimes(0);
        });

        it('should return itself', () => {
          expect.assertions(1);

          expect(system.unmount()).toBe(system);
        })
      });
    });
  });
});
