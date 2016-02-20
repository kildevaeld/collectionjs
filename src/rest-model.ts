
import {extend} from 'utilities/lib/objects';
import {IPromise, Promise} from 'utilities/lib/promises';
import {ModelOptions} from './model';
import {NestedModel} from './nested-model';
import {IPersistableModel, IPersistableCollection, ISerializable} from './interfaces';
import {RestMethod, SyncFunc, SyncOptions, sync, SyncResponse} from './persistence';

export interface RestModelOptions extends ModelOptions {
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

export interface ModelSaveOptions extends SyncOptions {
    changed?: boolean
}

export interface ModelRemoveOptions extends SyncOptions {
    wait?: boolean;
}



export class RestModel extends NestedModel implements IPersistableModel {
    idAttribute = 'id';
    collection: IPersistableCollection;
    rootURL: string;


    constructor(attr?:any, options: RestModelOptions = {}) {
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


        let url = this.getURL();
        if (url == null) return Promise.reject(new Error('Url or rootURL no specified'));

        options.url = url;

        this.trigger('before:fetch', this, options);

        return this.sync(RestMethod.Read, this, options)
        .then((result:SyncResponse) => {
            if (result) this.set(this.parse(result.content, options), options);
            this.trigger('fetch', this, result, options);
            return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            if (e) {
                throw e;
            }
            return this;
        });

    }

    /**
     * Save the model to the server
     */
    save(options?:ModelSaveOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        this.trigger('before:save', this, options);

        let method: RestMethod = RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];


        let url = this.getURL(this.id);
        if (url == null) return  Promise.reject(new Error('Url or rootURL no specified'));

        options.url = url;

        return this.sync(method, this, options)
        .then((result) => {
           this.set(result.content, options);
           this.trigger('save', this, result, options);
           return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            throw e;

        });

    }

    /**
     * Remove the model from the server and collection
     */
    remove(options?:ModelRemoveOptions): IPromise<any> {
        options = options ? extend({}, options) : {};
        if (this.isNew) {
            super.remove(options);
            return Promise.resolve(this)
        }

        let url = this.getURL(this.id);
        if (url == null) return  Promise.reject(new Error('Url or rootURL no specified'));

        this.trigger('before:remove', this, options);

        if (!options.wait) super.remove(options);

        options.url = url;

        return this.sync(RestMethod.Delete, this, options)
        .then((result) => {
           if (!options.wait) super.remove(options);
           return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            throw e;
        });
    }

    sync (method:RestMethod, model:ISerializable, options:SyncOptions): IPromise<SyncResponse> {
        return sync(method, model, options);
    }
}