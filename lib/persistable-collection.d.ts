import { Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions } from './collection';
import { IPersistableModel, IPersistableCollection, ISerializable } from './interfaces';
import { IPromise } from 'utilities/lib/promises';
import { RestMethod, SyncOptions } from './persistence';
export interface PersistableCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string;
    sync?: (method: RestMethod) => IPromise<any>;
}
export interface CollectionFetchOptions extends CollectionSetOptions, SyncOptions {
    parse?: boolean;
    reset?: boolean;
    progress?: (progress: number, total: number) => void;
}
export declare class PersistableCollection<T extends IPersistableModel> extends Collection<T> implements IPersistableCollection {
    url: string | (() => string);
    getURL(): string;
    constructor(models: any, options?: PersistableCollectionOptions<T>);
    fetch(options?: CollectionFetchOptions): IPromise<this>;
    sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<any>;
    create(value: any, options?: CollectionCreateOptions): IPersistableModel;
}
