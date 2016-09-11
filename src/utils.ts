
import {Collection} from './collection';
import {Model} from './model'
import {IModel} from './interfaces';
import {RestCollection} from './rest-collection';
import {RestModel} from './rest-model';

export function isCollection<T extends IModel>(a:any): a is Collection<T> {
  if (a == null) return false;
  return (a instanceof Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
}

export function isRestCollection<T extends IModel>(a:any): a is RestCollection<T>  {
  if (a == null) return false;
  return (a instanceof RestCollection) || a.__classType == 'RestCollection';
}

export function isModel(a:any): a is IModel {
  if (a == null) return false;
  return (a instanceof Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
}

export function isRestModel(a:any): a is RestModel {
  if (a == null) return false;
  return (a instanceof Model) ||  a.__classType === 'RestModel';
}