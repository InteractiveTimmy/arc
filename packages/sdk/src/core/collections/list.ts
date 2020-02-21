import { ArcObject } from '../models/index';
import Collection from './collection';

/**
 * List Collection Class.
 *
 * Provides an advanced interface for managing an `Array` of unique
 * {@link ArcObject}s.
 *
 * @typeParam Item - The type of items this collection manages.
 */
export default class List<Item extends ArcObject> extends Collection {
  /**
   * The items in this collection.
   */
  protected readonly items: Array<Item>;

  /**
   * Generate a new {@link List}.
   *
   * @param superior - The arc object this collection belongs to.
   */
  public constructor(superior: Item) {
    super(superior);

    this.items = [];
  }

  /** {@inheritDoc Collection#canLoad} */
  protected canLoad(item: Item): boolean {
    return !this.items.includes(item);
  }

  /** {@inheritDoc Collection#canUnload} */
  protected canUnload(item: Item): boolean {
    return this.items.includes(item);
  }

  /** {@inheritDoc Collection#processLoad} */
  protected processLoad(item: Item): this {
    this.items.push(item);

    return this;
  }

  /** {@inheritDoc Collection#processUnload} */
  protected processUnload(item: Item): this {
    this.items.splice(this.items.indexOf(item), 1);

    return this;
  }

  /** {@inheritDoc Collection#has} */
  public has(...items: Array<Item>): boolean {
    return items.every(
      (item: Item): boolean => this.items.includes(item),
    );
  }
}
