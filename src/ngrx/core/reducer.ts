import { CoreActions, CoreActionTypes, SetCoreModelAction } from "./actions";
import { CoreModel } from "./models";

export interface CoreState {
	availableCoreModels: CoreModel[],
	selectedCoreModel: CoreModel
}

const initialCoreState: CoreState = {
	availableCoreModels: [
		{
			id: 0,
			label: 'Hello'
		},
		{
			id: 1,
			label: 'how'
		},
		{
			id: 2,
			label: 'are'
		},
		{
			id: 3,
			label: 'you'
		},
		{
			id: 4,
			label: 'today?'
		}
	],
	selectedCoreModel: null
};

export function CoreReducer(state = initialCoreState, action: CoreActions): CoreState {
	switch (action.type) {
		case CoreActionTypes.CORE_MODEL_SET:
			return Object.assign({}, state, <CoreState>{ selectedCoreModel: (action as SetCoreModelAction).payload });

		case CoreActionTypes.CORE_MODEL_CLEAR:
			return Object.assign({}, state, <CoreState>{ selectedCoreModel: null });

		default: return state;
	}
}

export const getCoreModels = (state: CoreState) => state.availableCoreModels;
export const getSelectedCoreModel = (state: CoreState) => state.selectedCoreModel;
export const getSelectedCoreModelId = (state: CoreState) => {
	if (!state.selectedCoreModel) {
		return null;
	}

	return state.selectedCoreModel.id;
};
