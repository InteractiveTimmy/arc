import { ArcObject } from '../models/index';

/**
 * Abstract Collection Class
 *
 * Provides the framework for consumable collection classes to utilize when
 * managing a group of {@link ArcObject}s.
 */
export default abstract class Collection {
  /**
   * The {@link ArcObject} that this collection belongs to.
   */
  protected readonly superior: ArcObject;

  /**
   * Generate a new {@link Collection}.
   *
   * @param superior - The arc object this collection belongs to.
   */
  public constructor(superior: ArcObject) {
    this.superior = superior;
  }

  /**
   * Determine if an {@link ArcObject} can be loaded into this collection.
   *
   * @param item - The {@link ArcObject} to validate if it can be loaded.
   * @returns - `true` if the item can be loaded.
   */
  protected abstract canLoad(item: ArcObject): boolean;

  /**
   * Determine if an {@link ArcObject} can be unloaded from this collection.
   *
   * @param item - The {@link ArcObject} to validate if it can be unloaded.
   * @returns - `true` if the item can be unloaded.
   */
  protected abstract canUnload(item: ArcObject): boolean;

  /**
   * Process loading an {@link ArcObject} into this collection.
   *
   * @param item - The {@link ArcObject} to load into this collection.
   * @returns - Itself.
   */
  protected abstract processLoad(item: ArcObject): this;

  /**
   * Process unloading an {@link ArcObject} from this collection.
   *
   * @param item - The {@link ArcObject} to unload from this collection.
   * @returns - Itself.
   */
  protected abstract processUnload(item: ArcObject): this;

  /**
   * Determine if this collection contains the provided items.
   *
   * @param items - The {@link ArcObject}s to validate exist in this collection.
   * @returns - `true` if the {@link ArcObject}s exist in this collection.
   */
  public abstract has(...items: Array<ArcObject>): boolean;

  /**
   * Attempt to load an `Array` of {@link ArcObject}s into this collection.
   *
   * @param items - The `Array` of {@link ArcObject}s to attempt to load.
   * @returns - Itself.
   */
  public load(...items: Array<ArcObject>): this {
    items.forEach(
      (item: ArcObject): void => {
        if (this.canLoad(item)) {
          this.processLoad(item);
        }
      },
    );

    return this;
  }

  /**
   * Attempt to unload an `Array` of {@link ArcObject}s from this collection.
   *
   * @param items - The `Array` of {@link ArcObject}s to attempt to unload.
   * @returns - Itself.
   */
  public unload(...items: Array<ArcObject>): this {
    items.forEach(
      (item: ArcObject): void => {
        if (this.canUnload(item)) {
          this.processUnload(item);
        }
      },
    );

    return this;
  }
}
