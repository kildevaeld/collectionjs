import { IPromise } from 'utilities/lib/promises';
import { Model, ModelOptions } from './model';
import { IPersistableModel, IPersistableCollection, ISerializable } from './interfaces';
import { RestMethod, SyncFunc, SyncOptions } from './persistence';
export interface PersistableModelOptions extends ModelOptions {
    url?: string;
    sync?: SyncFunc;
}
export declare function normalize_path(url: string, id: string): string;
export interface ModelSaveOptions extends SyncOptions {
    changed?: boolean;
}
export interface ModelRemoveOptions extends SyncOptions {
    wait?: boolean;
}
export declare class PersistableModel extends Model implements IPersistableModel {
    idAttribute: string;
    collection: IPersistableCollection;
    rootURL: string;
    constructor(attr?: any, options?: PersistableModelOptions);
    getURL(id?: string): string;
    fetch(options?: any): IPromise<this>;
    save(options?: any): IPromise<any>;
    remove(options?: ModelRemoveOptions): IPromise<any>;
    sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<any>;
}
