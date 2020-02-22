import ArcObject from './arc-object';
import Scene from './scene';

export default abstract class System extends ArcObject {
  protected active: boolean;
  protected dt: number;
  protected ts: number;

  public scene: Scene;

  public constructor() {
    super();

    this.active = false;
    this.dt = 0;
    this.ts = 0;
  }

  protected abstract onStep(): void

  public mount(scene: Scene): this {
    if (this.scene) {
      this.scene.unmount(this);
    }

    this.scene = scene;

    return this;
  }

  public start(): this {
    this.active = true;
    this.ts = Date.now();

    setTimeout(() => this.step(), 0);

    return this;
  }

  public step(): void {
    if (!this.active) {
      return;
    }

    this.dt = Date.now() - this.ts;
    this.ts = Date.now();

    this.onStep();

    setTimeout(() => this.step(), 0);
  }

  public stop(): this {
    this.active = false;

    return this;
  }

  public unmount(): this {
    if (this.scene) {
      this.scene.unmount(this);
    }

    this.scene = undefined;

    return this;
  }
}
