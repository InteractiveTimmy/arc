import { uuid } from '../utils/index';

/**
 * Abstract ArcObject Class.
 *
 * Provides a root object for all other models within this project to extend
 * upon.
 */
export default abstract class ArcObject {
  /**
   * The unique identifier for this {@link ArcObject}.
   */
  public readonly uuid: string;

  /**
   * Generate a new {@link ArcObject}.
   */
  public constructor() {
    this.uuid = uuid();
  }
}
