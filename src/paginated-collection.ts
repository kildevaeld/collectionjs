import {IPersistableModel} from './interfaces';
import {Collection} from './collection';
import {RestCollection} from './rest-collection';
import {IPromise} from 'utilities/lib/promises';
import {SyncResponse} from './persistence';


const PARAM_TRIM_RE = /[\s'"]/g;
const URL_TRIM_RE = /[<>\s'"]/g;

export interface GetPageOptions {}

interface State {
  first: number
  last: number
  current: number
  size: number
}

interface Link {
  first?: number;
  prev?: number;
  last?: number;
}

export class PaginatedCollection<T extends IPersistableModel> extends RestCollection<T> {
  
  private _page: Collection<T>;
  
  get page (): Collection<T> {
    return this._page;
  }
  
  getPreviousPage (options?:GetPageOptions): IPromise<any> {
    return null;
  }
  
  getNextPage (options?:GetPageOptions): IPromise<any> {
    return null;
  }
  
  getPage(options?:GetPageOptions): IPromise<any> {
    
    return null;
  }
  
  
  private _parseLinkHeaders (resp:SyncResponse, header: {[key: string]: string}): Link  {
    var link: Link = {}; 
    
    if (typeof resp['getResponseHeader'] !== 'function') {
      return link;
    }
    
    let linkHeader = resp['getResponseHeader']('Link');
    if (!linkHeader) return link;
    linkHeader = linkHeader.split(',')
    let relations = ['first', 'prev', 'next'];
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