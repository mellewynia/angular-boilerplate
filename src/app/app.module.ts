import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { StoreModule } from '@ngrx/store';
import { AppReducer } from '../ngrx';

import { AppComponent } from "./app.component";

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		StoreModule.provideStore(AppReducer)
	],

	declarations: [
		AppComponent
	],

	providers: [

	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
