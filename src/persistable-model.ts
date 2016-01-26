
import {extend} from 'utilities/lib/objects';
import {IPromise, Promise} from 'utilities/lib/promises';
import {Model, ModelOptions} from './model';
import {IPersistableModel, IPersistableCollection, ISerializable} from './interfaces';
import {RestMethod, SyncFunc, SyncOptions, sync} from './persistence';

export interface PersistableModelOptions extends ModelOptions {
    url?:string
    sync?: SyncFunc
}

export function normalize_path(url:string, id:string): string {
    let i:number, p: string = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0,i);
    }
   if (url[url.length - 1] !== '/') url += '/'; 
   return url + id + p;
}

export interface ModelSaveOptions {
    changed?: boolean
}


export class PersistableModel extends Model implements IPersistableModel {
    idAttribute = 'id';
    collection: IPersistableCollection;
    rootURL: string;
    
    constructor(attr?:any, options: PersistableModelOptions = {}) {
        super(attr, options);
        if (options.url) {
            this.rootURL = options.url;
        }
    }
    
    getURL (id?:string): string {
        let url = this.rootURL;
        if (this.collection && this.collection.getURL()) {
            url = this.collection.getURL();
        }
        if (id && url) {
            url = normalize_path(url, this.id);
        }
        
        
        return url;
    }
    
    fetch(options?:any): IPromise<this> {
        options = options ? extend({}, options) : {};
        this.trigger('before:sync', this, options);
        let url = this.getURL();
        if (url == null) return Promise.reject(new Error('Url or rootURL no specified'));
        
        return this.sync(RestMethod.Read, this, {
            url: url,
            params: null
        })
        .then((result:any) => {
            if (result) this.set(this.parse(result, options), options);
            this.trigger('sync', this, result, options);
            return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            if (e) {
                throw e;
            }
            return this;
        });
 
    }
    
    save(options?:any): IPromise<this> {
        options = options ? extend({}, options) : {};
        this.trigger('before:save', this, options);
        
        let method: RestMethod = RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
        
        
        let url = this.getURL(this.id);
        if (url == null) return  Promise.reject(new Error('Url or rootURL no specified'));
        
        options.url = url;
        
        return this.sync(method, this, options)
        .then((result) => {
           this.set(result, options);
           this.trigger('save', this, result, options);
           return this; 
        }).catch((e) => {
            this.trigger('error', this, e);
            if (e) throw e;
            return this;
        });
        
    }
    
    destroy(): IPromise<void> {
        return null;
    }
    
    sync (method:RestMethod, model:ISerializable, options:SyncOptions): IPromise<any> {
        return null;
    }
}