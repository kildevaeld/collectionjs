import { ISerializable } from './interfaces';
import { IPromise } from 'utilities/lib/promises';
export declare enum RestMethod {
    Create = 0,
    Update = 1,
    Read = 2,
    Patch = 3,
    Delete = 4,
}
export interface SyncOptions {
    url?: string;
    params?: Object | string;
}
export interface SyncFunc {
    (method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<any>;
}
export declare function sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<any>;
