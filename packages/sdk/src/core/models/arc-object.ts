import { uuid } from '../utils/index';

/**
 * Abstract ArcObject Class.
 *
 * Provides a root object for all other models within this project to extend
 * upon.
 */
export default abstract class ArcObject {
  /**
   * The type of this {@link ArcObject}.
   */
  public readonly type: string;

  /**
   * The unique identifier for this {@link ArcObject}.
   */
  public readonly uuid: string;

  /**
   * Generate a new {@link ArcObject}.
   */
  public constructor() {
    this.type = this.constructor.name;
    this.uuid = uuid();
  }
}
