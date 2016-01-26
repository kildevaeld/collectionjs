

import {Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions} from './collection';
import {PersistableModel} from './persistable-model';
import {IModel, IPersistableModel, IPersistableCollection} from './interfaces';

import {IPromise} from 'utilities/lib/promises';

export interface PersistableCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string
    sync?:(method: RestMethod) => IPromise<any>
}

export interface CollectionFetchOptions extends CollectionSetOptions {
    parse?: boolean;
    reset?: boolean;
    progress?: (progress:number, total:number) => void;
}

export enum RestMethod {
    Create, Update, Read, Patch, Delete
};

export class PersistableCollection<T extends IPersistableModel> extends Collection<T> implements IPersistableCollection {
    url: string | (() => string);
    getURL(): string {
        return typeof this.url === 'function' ? (<(()=>string)>this.url)() : <string>this.url;
    }
    
    
    constructor(models: any, options: PersistableCollectionOptions<T> = {}) {
        super(models, options);
        
        if (options.url) this.url = options.url;
        
    }

    fetch(options?: CollectionFetchOptions): IPromise<this> {
        
        let url = this.getURL();
        
        return this.sync(RestMethod.Read)
        .then((results) => {
            this[options.reset ? 'reset' : 'set'](results, options);
            this.trigger('sync');
            return this;
        });
        
    }
    
    sync(method:RestMethod, options?:any): IPromise<any> {
        return null;
    }

    create(value:any, options?:CollectionCreateOptions): IPersistableModel {
        return null;
    }
}