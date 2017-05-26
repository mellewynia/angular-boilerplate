import { Component } from "@angular/core";

import { Store } from '@ngrx/store';
import { AppState, getCoreModels, getSelectedCoreModel } from '../../ngrx';
import { ClearCoreModelAction, SetCoreModelAction, CoreModel } from '../../ngrx/core';

import { Subscription } from "rxjs/Subscription";

@Component({
	selector: 'app',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	public selectedCoreModel: CoreModel = null;
	private selectedCoreModelSubscription: Subscription = this.store
		.select(getSelectedCoreModel)
		.subscribe(coreModel => {
			this.selectedCoreModel = coreModel;
		});

	public coreModels$ = this.store.select(getCoreModels);

	constructor(private store: Store<AppState>) { }

	public onSetCoreModel(coreModel: CoreModel) {
		this.store.dispatch(new SetCoreModelAction(coreModel));
	}

	public onClearCoreModel() {
		this.store.dispatch(new ClearCoreModelAction());
	}
}
