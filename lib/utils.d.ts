import { Collection } from './collection';
import { IModel } from './interfaces';
import { RestCollection } from './rest-collection';
import { RestModel } from './rest-model';
export declare function isCollection<T extends IModel>(a: any): a is Collection<T>;
export declare function isRestCollection<T extends IModel>(a: any): a is RestCollection<T>;
export declare function isModel(a: any): a is IModel;
export declare function isRestModel(a: any): a is RestModel;
