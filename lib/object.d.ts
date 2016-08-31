import { EventEmitter } from 'eventsjs';
export declare abstract class BaseObject extends EventEmitter {
    protected __classType: string;
    static extend: <T>(proto: any, stat?: any) => T;
}
