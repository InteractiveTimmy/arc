import { ArcObject } from '../models/index';
import Collection from './collection';

/**
 * Reference Collection Class.
 *
 * Provides an advanced interface for managing an `Record` of unique
 * {@link ArcObject}s.
 *
 * @typeParam Item - The type of items this collection manages.
 */
export default class Reference<Item extends ArcObject> extends Collection {
  /**
   * The key to uniquely identify the items in the collection by.
   */
  protected readonly index: keyof ArcObject;

  /**
   * The items in this collection.
   */
  protected readonly items: Record<string, Item>;

  /**
   * Generate a new {@link Reference}.
   *
   * @param superior - The arc object this collection belongs to.
   */
  public constructor(index: keyof ArcObject) {
    super();

    this.index = index;
    this.items = {};
  }

  /** {@inheritDoc Collection#canLoad} */
  protected canLoad(item: Item): boolean {
    return !(this.items[item[this.index]]);
  }

  /** {@inheritDoc Collection#canUnload} */
  protected canUnload(item: Item): boolean {
    return !!(this.items[item[this.index]]);
  }

  /** {@inheritDoc Collection#processLoad} */
  protected processLoad(item: Item): this {
    this.items[item[this.index]] = item;

    return this;
  }

  /** {@inheritDoc Collection#processUnload} */
  protected processUnload(item: Item): this {
    delete this.items[item[this.index]];

    return this;
  }

  /**
   * Get an {@link ArcObject} from this {@link Reference} via it's key value.
   *
   * @param key - The {@link ArcObject}'s key.
   * @returns - The {@link ArcObject} assigned to the provided key.
   */
  public get(key: string): Item {
    return this.items[key];
  }

  /** {@inheritDoc Collection#has} */
  public has(...items: Array<Item>): boolean {
    return items.every(
      (item: Item): boolean => !!(this.items[item[this.index]]),
    );
  }

  /**
   * Get an `Array` of all the {@link ArcObject}s in this {@link Reference}.
   *
   * @returns - An `Array` of {@link ArcObject}.
   */
  public list(): Array<Item> {
    return Object.keys(this.items).map(
      (key: string): Item => this.items[key],
    );
  }
}
