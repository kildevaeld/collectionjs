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
    protected __classType: string;
    length: number;
    private _model;
    Model: new (attr: Object, options?: any) => U;
    private _models;
    models: U[];
    comparator: string | SortFunction;
    options: CollectionOptions<U>;
    constructor(models?: U[] | Object[], options?: CollectionOptions<U>);
    add(models: U | U[] | Object | Object[], options?: CollectionSetOptions): void;
    protected set(items: U | U[], options?: CollectionSetOptions): U | U[];
    remove(models: U[] | U, options?: CollectionRemoveOptions): any;
    get(id: any): U;
    at(index: any): U;
    clone(options?: CollectionOptions<U>): any;
    sort(options?: CollectionSortOptions): this;
    sortBy(key: string | Function, context?: any): U[];
    push(model: any, options?: {}): void;
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
    private _removeReference(model, options?);
    private _addReference(model, options?);
    private _reset();
    private _onModelEvent(event, model, collection, options);
    destroy(): void;
}
