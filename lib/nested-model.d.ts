import { Model, ModelSetOptions } from './model';
export declare function objToPaths(obj: Object, separator?: string, array?: boolean): Object;
export declare function getNested(obj: any, path: any, return_exists?: any, separator?: string): any;
export interface NestedModelSetOptions extends ModelSetOptions {
    array?: boolean;
}
export declare class NestedModel extends Model {
    static keyPathSeparator: string;
    private _nestedListener;
    get(attr: any): any;
    set(key: string | Object, val?: any, options?: NestedModelSetOptions): this;
    clear(options: any): this;
    hasChanged(attr?: any): boolean;
    changedAttributes(diff: any): Object;
    previous(attr: any): any;
    previousAttributes(): any;
    pick(attr: string | string[], ...attrs: string[]): any;
    destroy(): void;
}
