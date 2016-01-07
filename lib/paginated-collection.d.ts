import { EventEmitter } from 'eventsjs';
import { ICollection, IModel } from './interfaces';
import { CollectionOptions } from './collection';
export interface PaginatedCollectionOptions<U extends IModel> extends CollectionOptions<U> {
}
export declare class PaginatedCollection<U extends IModel> extends EventEmitter implements ICollection {
    length: number;
    constructor(models: U[], options: PaginatedCollectionOptions<U>);
    indexOf(item: IModel): number;
    forEach(fn: (item: IModel, index?: number) => any): void;
    push(item: IModel): any;
}
