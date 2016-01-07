import { Model, ModelSetOptions } from './model';
export declare class NestedModel extends Model {
    static keyPathSeparator: string;
    private _nestedListener;
    get(attr: any): any;
    set(key: string | Object, val?: any, options?: ModelSetOptions): this;
    clear(options: any): this;
    hasChanged(attr?: any): boolean;
    changedAttributes(diff: any): {};
    previous(attr: any): any;
    previousAttributes(): any;
    destroy(): void;
}
