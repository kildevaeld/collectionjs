import { IPersistableModel } from './interfaces';
import { Collection } from './collection';
import { RestCollection } from './rest-collection';
import { IPromise } from 'utilities/lib/promises';
export interface GetPageOptions {
}
export declare class PaginatedCollection<T extends IPersistableModel> extends RestCollection<T> {
    private _page;
    page: Collection<T>;
    getPreviousPage(options?: GetPageOptions): IPromise<any>;
    getNextPage(options?: GetPageOptions): IPromise<any>;
    getPage(options?: GetPageOptions): IPromise<any>;
    private _parseLinkHeaders(resp, header);
}
