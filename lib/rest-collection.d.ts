import { IPromise } from 'orange';
import { Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions } from './collection';
import { IModel, IPersistableModel, IPersistableCollection, ISerializable } from './interfaces';
import { RestMethod, SyncOptions, SyncResponse } from './persistence';
export declare function isRestCollection<T extends IModel>(a: any): a is RestCollection<T>;
export interface RestCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string;
    sync?: (method: RestMethod) => IPromise<any>;
    queryParameter?: string;
}
export interface CollectionFetchOptions extends CollectionSetOptions, SyncOptions {
    parse?: boolean;
    reset?: boolean;
}
export interface RestCollectionCreateOptions extends CollectionCreateOptions, SyncOptions {
    wait?: boolean;
    complete?: (error: Error, model: IPersistableModel) => void;
}
export declare class RestCollection<T extends IPersistableModel> extends Collection<T> implements IPersistableCollection {
    protected readonly __classType: string;
    Model: any;
    url: string | (() => string);
    options: RestCollectionOptions<T>;
    getURL(): string;
    constructor(models: any, options?: RestCollectionOptions<T>);
    fetch(options?: CollectionFetchOptions): IPromise<any>;
    create(value: any, options?: RestCollectionCreateOptions): IPersistableModel;
    query(term: string, options?: CollectionFetchOptions): IPromise<T[]>;
    sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse>;
}
