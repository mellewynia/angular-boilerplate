import { combineReducers, ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromCore from './core/reducer';

export interface AppState {
	core: fromCore.CoreState
}

const appReducer: ActionReducer<AppState> = combineReducers({
	core: fromCore.CoreReducer
});
export function AppReducer(state: any, action: any) {
	return appReducer(state, action);
}

/* CORE */
const getCoreState = (state: AppState) => state.core;

export const getCoreModels = createSelector(getCoreState, fromCore.getCoreModels);
export const getSelectedCoreModel = createSelector(getCoreState, fromCore.getSelectedCoreModel);
export const getSelectedCoreModelId = createSelector(getCoreState, fromCore.getSelectedCoreModelId);
