import {ISerializable} from './interfaces';
import {IPromise} from 'utilities/lib/promises';
export enum RestMethod {
    Create, Update, Read, Patch, Delete
};

export interface SyncOptions {
    url?:string;
    params?: Object|string;
}

export interface SyncFunc {
    (method:RestMethod, model:ISerializable, options: SyncOptions): IPromise<any>
}


export function sync (method: RestMethod, model:ISerializable, options:SyncOptions): IPromise<any> {
    return null;
}