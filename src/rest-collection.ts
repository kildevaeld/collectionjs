
import { extend, IPromise, Promise } from 'orange';
import { Collection, CollectionOptions, CollectionCreateOptions, CollectionSetOptions } from './collection';
import { RestModel, isRestModel } from './rest-model';
import {
  IModel, IPersistableModel,
  IPersistableCollection, ISerializable
} from './interfaces';
import { RestMethod, SyncFunc, SyncOptions, sync, SyncResponse } from './persistence';

export function isRestCollection<T extends IModel>(a: any): a is RestCollection<T> {
  if (a == null) return false;
  return (a instanceof RestCollection) || a.__classType == 'RestCollection';
}


export interface RestCollectionOptions<T extends IPersistableModel> extends CollectionOptions<T> {
  url?: string
  sync?: (method: RestMethod) => IPromise<any>
  queryParameter?: string
}

export interface CollectionFetchOptions extends CollectionSetOptions, SyncOptions {
  parse?: boolean;
  reset?: boolean;
}

export interface CollectionQueryOptions<T extends IPersistableModel> extends CollectionFetchOptions {
  predicate?: (model: T) => boolean;
}

export interface RestCollectionCreateOptions extends CollectionCreateOptions, SyncOptions {
  wait?: boolean;
  complete?: (error: Error, model: IPersistableModel) => void;
}


export class RestCollection<T extends IPersistableModel> extends Collection<T> implements IPersistableCollection {
  protected get __classType() { return 'RestCollection' };
  Model = <any>RestModel
  url: string | (() => string);
  options: RestCollectionOptions<T>;

  getURL(): string {
    return typeof this.url === 'function' ? (<(() => string)>this.url)() : <string>this.url;
  }

  constructor(models: any, options: RestCollectionOptions<T> = {}) {
    super(models, options);

    if (options.url) this.url = options.url;

    this.options.queryParameter = this.options.queryParameter || 'q';
  }

  fetch(options?: CollectionFetchOptions): IPromise<any> {
    options = options ? extend({}, options) : {};

    let url = this.getURL();
    if (url == null) return Promise.reject(new Error('Url or rootURL no specified'));
    options.url = url;

    this.trigger('before:fetch');
    return this.sync(RestMethod.Read, this, options)
      .then((results) => {
        (<any>this[options.reset ? 'reset' : 'set'])(results.content, options);
        this.trigger('fetch');
        return this;
      }).catch((e) => {
        this.trigger('error', e);
        throw e;
      });

  }

  create(value: any, options?: RestCollectionCreateOptions): IPersistableModel {
    options = options ? extend({}, options) : {};
    let model: IPersistableModel

    let url = this.getURL();
    if (url == null) throw new Error('Url or rootURL no specified');

    options.url = url;

    if (isRestModel(value)) {
      model = value;
    } else {
      model = new this.Model(value, { parse: true, url: this.getURL() });
    }

    if (options.wait === void 0) options.wait = true;

    if (!options.wait) this.add(model, options);

    this.trigger('before:create', this, model, value, options);

    model.save().then(() => {

      if (!options.wait) this.add(model, options);

      this.trigger('create', this, model, value, options);

      if (options.complete) options.complete(null, model);

    }).catch((e) => {
      this.trigger('error', e);
      if (options.complete) options.complete(e, null);
    })

    return model;
  }

  query(term: string, options: CollectionFetchOptions = {merge:true}): IPromise<T[]> {

    let params = { [this.options.queryParameter]: term };

    let url = this.getURL();
    if (url == null) return Promise.reject(new Error('Url or rootURL no specified'));
    options.url = url;
    if (!options.params) options.params = {};
    extend(options.params, params);

    this.trigger('before:query');
    return <any>this.sync(RestMethod.Read, this, options)
      .then((results) => {
        let models = this.add(results.content, options);
        this.trigger('query');
        return models;
      }).catch((e) => {
        this.trigger('error', e);
        throw e;
      });


  }

  sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse> {
    return sync(method, model, options);
  }


}