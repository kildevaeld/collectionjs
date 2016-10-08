import { IPersistableModel } from './interfaces';
import { Collection } from './collection';
import { RestCollection, RestCollectionOptions, CollectionFetchOptions } from './rest-collection';
import { IPromise } from 'orange';
export interface GetPageOptions extends CollectionFetchOptions {
    page?: number;
}
export interface PaginatedCollectionOptions<T extends IPersistableModel> extends RestCollectionOptions<T> {
    queryParams?: QueryParameters;
    firstPage?: number;
    pageSize?: number;
}
export interface QueryParameters {
    page: string;
    size: string;
}
export declare class PaginatedCollection<T extends IPersistableModel> extends RestCollection<T> {
    private _link;
    private _state;
    private _page;
    page: Collection<T>;
    queryParams: QueryParameters;
    constructor(models?: any, options?: PaginatedCollectionOptions<T>);
    hasNext(): boolean;
    hasPrevious(): boolean;
    hasPage(page: number): boolean;
    getPreviousPage(options?: GetPageOptions): IPromise<any>;
    getNextPage(options?: GetPageOptions): IPromise<any>;
    getPage(options?: GetPageOptions): IPromise<any>;
    fetch(options?: GetPageOptions): IPromise<any>;
    private _processResponse(resp, options);
    private _parseLinkHeaders(resp);
}
