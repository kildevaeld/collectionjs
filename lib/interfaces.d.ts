import { IEventEmitter } from 'eventsjs';
import { IPromise } from 'utilities/lib/promises';
export interface ISerializable {
    toJSON(): any;
}
export interface IModelOptions {
    collection?: ICollection;
}
export interface IModel extends IEventEmitter {
    collection?: ICollection;
    idAttribute?: string;
    uid: string;
    id?: string;
    get(key: string): any;
    set(key: string | Object, value?: any): any;
    toJSON?: () => any;
    hasChanged(attr?: any): boolean;
    changed: {
        [key: string]: any;
    };
}
export interface IModelConstructor {
    new (attr?: any, options?: IModelOptions): IModel;
}
export interface IPersistableModel extends IModel {
    collection?: IPersistableCollection;
    fetch(): IPromise<IPersistableModel>;
    save(): IPromise<IPersistableModel>;
    destroy(): IPromise<void>;
}
export interface ICollection extends IEventEmitter {
    length: number;
    indexOf: (item: IModel) => number;
    forEach(fn: (item: IModel, index?: number) => any): any;
    push(item: IModel): any;
}
export interface ICollectionConstructor {
    new <T>(models?: any[], options?: any): ICollection;
}
export interface IPersistableCollection extends ICollection {
    getURL(): string;
}
export interface Silenceable {
    silent?: boolean;
}
