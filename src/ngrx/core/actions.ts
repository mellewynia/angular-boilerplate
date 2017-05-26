import { Action } from '@ngrx/store';
import { uniqueAction } from "../util";

import { CoreModel } from './models';

export const CoreActionTypes = {
	CORE_MODEL_SET: uniqueAction('[CORE] Set core model'),
	CORE_MODEL_CLEAR: uniqueAction('[CORE] Clear core model')
};

export class SetCoreModelAction implements Action {
	type = CoreActionTypes.CORE_MODEL_SET;

	constructor(public payload: CoreModel) { }
}

export class ClearCoreModelAction implements Action {
	type = CoreActionTypes.CORE_MODEL_CLEAR;
	payload: any = null;
}

export type CoreActions =
	SetCoreModelAction |
	ClearCoreModelAction;
