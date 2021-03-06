import { BaseObject } from './object';
import { IModel, ICollection, Silenceable, ISerializable } from './interfaces';
export declare function isCollection<T extends IModel>(a: any): a is Collection<T>;
export declare type SortFunction = <T>(a: T, b: T) => number;
export interface CollectionOptions<U> {
    model?: new (attr: Object, options?: any) => U;
}
export interface CollectionSetOptions extends Silenceable {
    at?: number;
    sort?: boolean;
    add?: boolean;
    merge?: boolean;
    remove?: boolean;
    parse?: boolean;
}
export interface CollectionRemoveOptions extends Silenceable {
    index?: number;
}
export interface CollectionSortOptions extends Silenceable {
}
export interface CollectionCreateOptions extends CollectionSetOptions {
}
export interface CollectionResetOptions extends Silenceable {
    previousModels?: IModel[];
}
export declare class Collection<U extends IModel> extends BaseObject implements ICollection, ISerializable {
    protected readonly __classType: string;
    readonly length: number;
    private _model;
    Model: new (attr: Object, options?: any) => U;
    private _models;
    readonly models: U[];
    comparator: string | SortFunction;
    options: CollectionOptions<U>;
    constructor(models?: U[] | Object[], options?: CollectionOptions<U>);
    add(models: U | U[] | Object | Object[], options?: CollectionSetOptions): U | U[];
    protected set(items: U | U[], options?: CollectionSetOptions): U | U[];
    remove(models: U[] | U, options?: CollectionRemoveOptions): U | U[];
    get(id: any): U;
    at(index: any): U;
    clone(options?: CollectionOptions<U>): any;
    sort(options?: CollectionSortOptions): this;
    sortBy(key: string | ((m: U, i: number, a: U[]) => boolean), context?: any): U[];
    push(model: any, options?: {}): U | U[];
    reset(models: any, options?: CollectionResetOptions): any;
    create(values?: any, options?: CollectionCreateOptions): IModel;
    parse(models: U | U[], options?: CollectionSetOptions): U | U[];
    find(nidOrFn: any): any;
    forEach(iterator: (model: U, index?: number) => void, ctx?: any): this;
    map<T>(iterator: (model: U, index?: number, collection?: ICollection) => T, thisArgs?: any): T[];
    filter(fn: (model: U, index?: number) => boolean): U[];
    indexOf(model: U): number;
    toJSON(): any[];
    protected _prepareModel(value: any): U;
    protected _removeReference(model: U, options?: any): void;
    protected _addReference(model: IModel, options?: any): void;
    protected _reset(): void;
    private _onModelEvent(event, model, collection, options);
    destroy(): void;
}
