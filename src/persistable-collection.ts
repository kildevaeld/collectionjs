
import {extend} from 'utilities/lib/objects';
import {Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions} from './collection';
import {PersistableModel} from './persistable-model';
import {IModel, IPersistableModel, 
    IPersistableCollection, ISerializable} from './interfaces';

import {IPromise} from 'utilities/lib/promises';
import {RestMethod, SyncFunc, SyncOptions, sync} from './persistence';

export interface PersistableCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
    url?: string
    sync?:(method: RestMethod) => IPromise<any>
}

export interface CollectionFetchOptions extends CollectionSetOptions, SyncOptions {
    parse?: boolean;
    reset?: boolean;
    progress?: (progress:number, total:number) => void;
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

    fetch(options?: CollectionFetchOptions): IPromise<this> {
        options = options ? extend({}, options) : {};
        let url = this.getURL();
        this.trigger('before:sync');
        return this.sync(RestMethod.Read, this, options)
        .then((results) => {
            this[options.reset ? 'reset' : 'set'](results, options);
            this.trigger('sync');
            return this;
        });
        
    }
    
    sync(method:RestMethod, model:ISerializable, options:SyncOptions): IPromise<any> {
        return sync(method, model, options);
    }

    create(value:any, options?:CollectionCreateOptions): IPersistableModel {
        return null;
    }
}