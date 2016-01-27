import {IPersistableModel} from './interfaces';
import {Collection} from './collection';
import {RestCollection, RestCollectionOptions, CollectionFetchOptions} from './rest-collection';
import {IPromise, Promise} from 'utilities/lib/promises';
import {SyncResponse, RestMethod} from './persistence';
import {extend, has} from 'utilities/lib/objects';
import {queryParam} from 'utilities/lib/request';

const PARAM_TRIM_RE = /[\s'"]/g;
const URL_TRIM_RE = /[<>\s'"]/g;

function queryStringToParams (qs:string): Object {
    var kvp, k, v, ls, params = {}, decode = decodeURIComponent;
    var kvps = qs.split('&');
    for (var i = 0, l = kvps.length; i < l; i++) {
      var param = kvps[i];
      kvp = param.split('='), k = kvp[0], v = kvp[1];
      if (v == null) v = true;
      k = decode(k), v = decode(v), ls = params[k];
      if (Array.isArray(ls)) ls.push(v);
      else if (ls) params[k] = [ls, v];
      else params[k] = v;
    }
    return params;
}

export interface GetPageOptions extends CollectionFetchOptions {
  page?: number;
}

export interface PaginatedCollectionOptions<T extends IPersistableModel> extends RestCollectionOptions<T> {
  queryParams?: QueryParameters
  firstPage?: number
}

interface State {
  first: number
  last: number
  current: number
  size: number
}

interface Link {
  first?: string;
  prev?: string;
  last?: string;
  next?: string;
}

export interface QueryParameters {
  page: string;
}

export class PaginatedCollection<T extends IPersistableModel> extends RestCollection<T> {
  private _link: {[key:number]: string };
  private _state: State;
  private _page: Collection<T>;
  
  public get page (): Collection<T> {
    return this._page;
  }
  
  queryParams: QueryParameters;
  
  constructor(models?:any, options:PaginatedCollectionOptions<T> = {}) {
    super(models, options);
    this._state = {first:1, last:-1, current:1, size:0}
    this._link = {};
    this.queryParams = {
      page: 'page'
    };
    
    if (options.queryParams) {
        extend(this.queryParams, options.queryParams);
    } 
    
    if (options.firstPage) this._state.first = options.firstPage;
    this._state.current = this._state.first;
    
    this._page = new Collection<T>();
    this._page.Model = this.Model;
    
  }
  
  public getPreviousPage (options?:GetPageOptions): IPromise<any> {
    options = options ? extend({}, options) : {};
    options.page = this._state.current - 1;
    return this.getPage(options);
  }
  
  public getNextPage (options?:GetPageOptions): IPromise<any> {
    options = options ? extend({}, options) : {};
    options.page = this._state.current + 1;
   
    return this.getPage(options);
  }
  
  public getPage(options?:GetPageOptions): IPromise<any> {
    options = options ? extend({}, options) : {};
    if (options.page === void 0) return Promise.reject(new Error("No page"));
    
    if (this._state.last < options.page && this._state.last != -1) {
      options.page = this._state.last;
    } else if (options.page < this._state.first) {
      options.page = this._state.first;
    }
    
    return this.fetch(options);
  }
  
  public fetch(options:GetPageOptions = {}): IPromise<any> {
    
    options = options ? extend({}, options) : {};
    
    let url: string;
    if (!has(options, 'page')) {
      options.page = this._state.current;
    }
    
    let params = options.params ? extend({}, options.params) : {};
    if (has(params, this.queryParams.page)) delete params[this.queryParams.page]
    
    url = this._link[options.page];
    if (!url) {
      url = this.getURL();
    }
   
    if (!url) return Promise.reject(new Error("no url specified"));
    
    let idx = url.indexOf('?');
    if (idx > -1) {
      params = extend(params, queryStringToParams(url.substr(0, idx + 1)));
      url = url.substr(0, idx);
    }
    
    if (!has(params, this.queryParams.page)) {
      params[this.queryParams.page] = options.page;
    }     
    
    options.params = params;
    options.url = url;
    this.trigger('before:fetch', this, options);
    
    let currentPage = options.page;
    
    if (!this._link[options.page + '']) {
      this._link[options.page] = url + queryParam({page:options.page})
    }
    
    return this.sync(RestMethod.Read, this, options)
    .then((resp) => {
      
      let links = this._parseLinkHeaders(resp);
      
      if (links.first) this._link[this._state.first] = links.first;
      if (links.prev) this._link[currentPage - 1] = links.prev;
      if (links.next) this._link[currentPage + 1] = links.next;
 
      if (links.last) {
        let last = links.last;
        let idx = last.indexOf('?')
        
        if (idx > -1) {
           let params = queryStringToParams(last.substr(idx + 1));
            
           if (has(params, this.queryParams.page)) {
             this._link[params[this.queryParams.page]] = last;
             this._state.last = parseInt(params[this.queryParams.page]);
           }
        }
       
      }

 
      this._state.current = currentPage;
      
      let data = resp.content;
      
      if (data && !Array.isArray(data)) data = [data];
    
      if (!data) return this;
      
      data = this.parse(data);
    
      for ( let i = 0, ii = data.length; i < ii; i++ ) {
        data[i] = new this.Model(data[i], { parse: true });
      }
      
      this[options.reset ? 'reset' : 'set'](data, options);
      
      this.page.reset(data);
      this.trigger('sync');
      
      return this;
      
    }).catch((e) => {
      this.trigger('error', e);
      throw e;
    })
  }
  
  
  private _parseLinkHeaders (resp:SyncResponse): Link  {
    var link: Link = {}; 
    
    if (typeof resp['getResponseHeader'] !== 'function') {
      return link;
    }
    
    let linkHeader = resp['getResponseHeader']('Link');
    if (!linkHeader) return link;
    linkHeader = linkHeader.split(',')
    let relations = ['first', 'prev', 'next', 'last'];
    for (let i=0,ii = linkHeader.length; i < ii; i++) {
      let linkParts = linkHeader[i].split(';'),
        url = linkParts[0].replace(URL_TRIM_RE, ''),
        params = linkParts.slice(1);
      for (let x=0,xx = params.length; x<xx ;x++) {
        let paramParts = params[x].split('='),
          key = paramParts[0].replace(PARAM_TRIM_RE, ''),
          value = paramParts[1].replace(PARAM_TRIM_RE, '');
        if (key == 'rel' && !!~relations.indexOf(value))
          link[value] = url;
        
      }
    }
    
    return link;
    
  }
  
} 