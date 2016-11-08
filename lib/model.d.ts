import { BaseObject } from './object';
import { IModel, ICollection, ISerializable } from './interfaces';
export interface ModelOptions {
    collection?: ICollection;
    parse?: boolean;
    idAttribute?: string;
}
export interface ModelSetOptions {
    unset?: boolean;
    silent?: boolean;
}
export declare function isModel(a: any): a is IModel;
export declare class Model extends BaseObject implements IModel, ISerializable {
    protected readonly __classType: string;
    protected _attributes: any;
    uid: string;
    collection: ICollection;
    idAttribute: string;
    options: ModelOptions;
    private _previousAttributes;
    protected _changed: any;
    private _changing;
    private _pending;
    readonly id: any;
    readonly isNew: boolean;
    readonly isDirty: boolean;
    constructor(attributes?: Object, options?: ModelOptions);
    set(key: string | Object, val?: any | ModelSetOptions, options?: ModelSetOptions): this;
    get(key: any): any;
    unset(key: any, options: ModelSetOptions): void;
    has(attr: any): boolean;
    hasChanged(attr?: any): boolean;
    clear(options?: any): this;
    readonly changed: any;
    changedAttributes(diff: any): any;
    previous(attr: any): any;
    previousAttributes(): any;
    toJSON(): any;
    clone(): IModel;
    parse(attr: any, options?: any): any;
    remove(options?: any): any;
    pick(attr: string | string[], ...attrs: string[]): any;
}
