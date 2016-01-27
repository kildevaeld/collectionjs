import {ISerializable} from './interfaces';
import {IPromise, Promise} from 'utilities/lib/promises';
import {ajax, proxy} from 'utilities/lib/utils';
import {queryParam} from 'utilities/lib/request';

export enum RestMethod {
    Create, Update, Read, Patch, Delete
};

export interface SyncOptions {
    url?:string;
    contentType?:string
    params?: Object|string;
    headers?: {[key:string]: string};
    progress?: (progress:number, total:number) => void;
    beforeSend?: (xhr:XMLHttpRequest) => void
}

export interface SyncFunc {
    (method:RestMethod, model:ISerializable, options: SyncOptions): IPromise<SyncResponse>
}

export interface SyncResponse {
  method: RestMethod;
  status: number;
  content: any;
  
  [key: string]: any;
}

const xmlRe = /^(?:application|text)\/xml/;
const jsonRe = /^application\/json/;

var getData = function(accepts, xhr) {
  if (accepts == null) accepts = xhr.getResponseHeader('content-type');
  if (xmlRe.test(accepts)) {
    return xhr.responseXML;
  } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
    return JSON.parse(xhr.responseText);
  } else {
    return xhr.responseText;
  }
};

var isValid = function(xhr) {
  return (xhr.status >= 200 && xhr.status < 300) ||
    (xhr.status === 304) ||
    (xhr.status === 0 && window.location.protocol === 'file:')
};

export function sync (method: RestMethod, model:ISerializable, options:SyncOptions): IPromise<SyncResponse> {
    let http;
    switch (method) {
      case RestMethod.Create:
        http = 'POST';
        break;
      case RestMethod.Update:
        http = "PUT";
        break;
      case RestMethod.Patch:
        http = "PATCH";
        break;
      case RestMethod.Delete:
        http = "DELETE";
        break;
      case RestMethod.Read:
        http = "GET";
        break;
      default:
        return Promise.reject(new Error(`Sync: does not recognise method: ${method}`));
    }
    
   
   let xhr = ajax();
   
   let query: string, url = options.url;
   if (options.params) query = queryParam(options.params);
   
   if (query) {
    var sep = (options.url.indexOf('?') === -1) ? '?' : '&';
    url += sep + query.substring(1);
   }
   
   return new Promise((resolve, reject) => {
     
     xhr.onreadystatechange = function () {
       if (xhr.readyState !== 4) return;
       
       let response: SyncResponse = {
         method: method,
         status: xhr.status,
         content: getData(options.headers['Accept'], xhr)
       };
       
       //response.content = getData(options.Accept, xhr);
      
       proxy(response, xhr, ['getAllResponseHeaders', 'getResponseHeader']);
       
       if (isValid(xhr)) {
         return resolve(response)
       } else {
         var error = new Error('Server responded with status of ' + xhr.statusText);
         return reject(error);
       }
       
     }
     
     xhr.open(http, url, true);
     
     if (!(options.headers && options.headers['Accept'])) {
        options.headers = {
          Accept: "*/*"
        }
     }
     
     if (options.headers) for (var key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
     
     if (options.beforeSend) options.beforeSend(xhr);
     xhr.send(model.toJSON());
   
   });
}