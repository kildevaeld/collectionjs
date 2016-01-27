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
    contentType?: string;
    params?: Object | string;
    headers?: {
        [key: string]: string;
    };
    progress?: (progress: number, total: number) => void;
    beforeSend?: (xhr: XMLHttpRequest) => void;
}
export interface SyncFunc {
    (method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse>;
}
export interface SyncResponse {
    method: RestMethod;
    status: number;
    content: any;
    [key: string]: any;
}
export declare function sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse>;
