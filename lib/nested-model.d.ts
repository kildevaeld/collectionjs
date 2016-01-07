import { Model, ModelSetOptions } from './model';
export declare class NestedModel extends Model {
    static keyPathSeparator: string;
    private _nestedListener;
    get(attr: any): any;
    set(key: string | Object, val?: any, options?: ModelSetOptions): NestedModel;
    clear(options: any): NestedModel;
    hasChanged(attr?: any): boolean;
    changedAttributes(diff: any): {};
    previous(attr: any): any;
    previousAttributes(): any;
    destroy(): void;
}
