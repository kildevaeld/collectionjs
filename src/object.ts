import {EventEmitter} from 'eventsjs'
import {inherits} from 'orange'

export abstract class BaseObject extends EventEmitter {
  protected __classType: string;
  static extend = function <T>(proto: any, stat?: any): T {
    return inherits(this, proto, stat);
  }
}
