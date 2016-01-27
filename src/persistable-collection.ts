
import {extend} from 'utilities/lib/objects';
import {Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions} from './collection';
import {PersistableModel} from './persistable-model';
import {IModel, IPersistableModel, 
    IPersistableCollection, ISerializable} from './interfaces';

import {IPromise, Promise} from 'utilities/lib/promises';
import {RestMethod, SyncFunc, SyncOptions, sync} from './persistence';

export interface PersistableCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string
    sync?:(method: RestMethod) => IPromise<any>
}

export interface CollectionFetchOptions extends CollectionSetOptions, SyncOptions {
    parse?: boolean;
    reset?: boolean;

}



export class PersistableCollection<T extends IPersistableModel> extends Collection<T> implements IPersistableCollection {
    url: string | (() => string);
    getURL(): string {
        return typeof this.url === 'function' ? (<(()=>string)>this.url)() : <string>this.url;
    }
    
    constructor(models: any, options: PersistableCollectionOptions<T> = {}) {
        super(models, options);
        if (options.url) this.url = options.url;
    }

    fetch(options?: CollectionFetchOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        
        let url = this.getURL();
        if (url == null) return Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        
        this.trigger('before:sync');
        return this.sync(RestMethod.Read, this, options)
        .then((results) => {
            this[options.reset ? 'reset' : 'set'](results, options);
            this.trigger('sync');
            return this;
        }).catch((e) => {
            this.trigger('error', e);
            throw e;
        });
    
    }
    
    create(value:any, options?:CollectionCreateOptions): IPersistableModel {
        return null;
    }
    
    sync(method:RestMethod, model:ISerializable, options:SyncOptions): IPromise<any> {
        return sync(method, model, options);
    }

    
}