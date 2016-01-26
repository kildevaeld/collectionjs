
import {IPromise} from 'utilities/lib/promises';
import {Model, ModelOptions} from './model';
import {IPersistableModel, IPersistableCollection} from './interfaces';
import {RestMethod} from './persistable-collection';

export interface PersistableModelOptions extends ModelOptions {
    sync?: (method:RestMethod, options:any) => IPromise<any>
}


export class PersistableModel extends Model implements IPersistableModel {
    
    fetch(): IPromise<this> {
        return null;
    }
    
    save(): IPromise<this> {
        return null;
    }
    
    destroy(): IPromise<void> {
        return null;
    }
    
    sync () {
        
    }
}