import { Collection, CollectionOptions, CollectionCreateOptions } from './collection';
import { IPersistableModel } from './interfaces';
import { IPromise } from 'utilities/lib/promises';
export interface PersistableCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string;
}
export interface CollectionFetchOptions {
}
export declare class PersistableCollection<T extends IPersistableModel> extends Collection<T> {
    constructor(models: any, options: PersistableCollection<T>);
    fetch(): IPromise<this>;
    create(value: any, options?: CollectionCreateOptions): IPersistableModel;
}
