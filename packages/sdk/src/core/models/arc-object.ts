import { uuid } from '../utils/index';

export default abstract class ArcObject {
  public readonly uuid: string;

  public constructor() {
    this.uuid = uuid();
  }
}
