import ArcObject from './arc-object';
import Component from './component';

export default class Entity extends ArcObject {
  public readonly components: Record<string, Component>;

  public constructor() {
    super();

    this.components = {};
  }

  protected canLoad(component: Component): boolean {
    return !(this.components[component.type]);
  }

  protected canUnload(component: Component): boolean {
    return (this.components[component.type] === component);
  }

  protected processLoad(component: Component): void {
    this.components[component.type] = component;
  }

  protected processUnload(component: Component): void {
    delete this.components[component.type];
  }

  public has(...components: Array<typeof Component>): boolean {
    return components.every(
      (component: typeof Component): boolean => !!(
        this.components[component.name]
      ),
    );
  }

  public load(...components: Array<Component>): this {
    components.forEach(
      (component: Component): void => {
        if (this.canLoad(component)) {
          this.processLoad(component);
        }
      },
    );

    return this;
  }

  public unload(...components: Array<Component>): this {
    components.forEach(
      (component: Component): void => {
        if (this.canUnload(component)) {
          this.processUnload(component);
        }
      },
    );

    return this;
  }
}
