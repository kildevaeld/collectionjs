import {ISerializable} from './interfaces';
import {IPromise} from 'utilities/lib/promises';
export enum RestMethod {
    Create, Update, Read, Patch, Delete
};

export interface SyncOptions {
    url?:string;
    params?: Object|string;
    headers?: {[key:string]: string};
    progress?: (progress:number, total:number) => void;
}

export interface SyncFunc {
    (method:RestMethod, model:ISerializable, options: SyncOptions): IPromise<any>
}


export function sync (method: RestMethod, model:ISerializable, options:SyncOptions): IPromise<any> {
    return null;
}