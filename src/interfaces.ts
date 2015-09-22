/// <reference path="../node_modules/eventsjs/events.d.ts" />
/// <reference path="../node_modules/utilities/utilities.d.ts" />

import {IEventEmitter} from 'eventsjs'

export interface IModelOptions {
    collection?: ICollection
  }

export interface IModel extends IEventEmitter {
		collection?: ICollection
		idAttribute?: string
		uid: string
		id?: string
		get(key: string)
		set(key: string|Object, value?: any): any
		toJSON?: () => any
		hasChanged(attr?): boolean
}

export interface IModelConstructor {
	new (attr?:any, options?:IModelOptions): IModel
}

export interface ICollection extends IEventEmitter {
		length: number
		indexOf: (item: IModel) => number
		forEach(fn: (item: IModel, index?: number) => any)
		push(item: IModel): any
}

export interface Silenceable {
		silent?: boolean
}