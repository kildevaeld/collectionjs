import { ISerializable } from './interfaces';
import { IPromise, Promise, proxy } from 'orange';
import { HttpMethod, HttpRequest, Headers } from 'orange.request';

export class HttpError extends Error {
  public message: string;
  public status: number;
  public body: any;
  constructor(status: number, message: string, body: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.body = body;
  }
}

export enum RestMethod {
  Create, Update, Read, Patch, Delete
};

export interface SyncOptions {
  url?: string;
  contentType?: string
  params?: Object | string;
  headers?: { [key: string]: string };
  progress?: (progress: number, total: number) => void;
  beforeSend?: (xhr: HttpRequest) => void
}

export interface SyncFunc {
  (method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse>
}

export interface SyncResponse {
  method: RestMethod;
  status: number;
  content: any;
  headers: Headers;
  [key: string]: any;
}

const xmlRe = /^(?:application|text)\/xml/;
const jsonRe = /^application\/json/;

var getData = function (accepts, xhr) {

  if (accepts == null) accepts = xhr.getResponseHeader('content-type');
  if (xmlRe.test(accepts)) {
    return xhr.responseXML;
  } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
    return JSON.parse(xhr.responseText);
  } else {
    return xhr.responseText;
  }
};

var isValid = function (xhr) {
  return (xhr.status >= 200 && xhr.status < 300) ||
    (xhr.status === 304) ||
    (xhr.status === 0 && window.location.protocol === 'file:')
};

export function sync(method: RestMethod, model: ISerializable, options: SyncOptions): IPromise<SyncResponse> {
  let http: HttpMethod;
  switch (method) {
    case RestMethod.Create:
      http = HttpMethod.POST
      break;
    case RestMethod.Update:
      http = HttpMethod.PUT;
      break;
    case RestMethod.Patch:
      http = HttpMethod.PATCH;
      break;
    case RestMethod.Delete:
      http = HttpMethod.DELETE;
      break;
    case RestMethod.Read:
      http = HttpMethod.GET;
      break;
    default:
      return Promise.reject(new Error(`Sync: does not recognise method: ${method}`));
  }


  let request = new HttpRequest(http, options.url);

  if (options.params) request.params(options.params);
  if (options.headers) request.header(options.headers);

  request.header('Content-Type', 'application/json');

  if (!(options.headers && options.headers['Accept'])) {
    request.header('Accept', 'application/json')
  }


  if (options.beforeSend) options.beforeSend(request);

  let data = undefined;
  if (http == HttpMethod.PATCH || http === HttpMethod.PUT || http === HttpMethod.POST) {
    data = JSON.stringify(model.toJSON());
  }

  return request.end(data)
  .then( res => {
    if (!res.isValid) {
      return res.text().then( t => {throw new HttpError(res.status, res.statusText, t)})
    }
    return res.json()
    .then( json => {
      return {
        method: method,
        status: res.status,
        content: json,
        headers: new Headers(res.headers)
      }
    });
  });

}