import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeroesComponent} from "./heroes/heroes.component";
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import { MessagesComponent } from "./messages/messages.component";

export const declarations = [
  AppComponent,
  HeroesComponent,
  HeroDetailComponent,
  MessagesComponent
];
export const imports = [
  BrowserModule,
  FormsModule
];

@NgModule({
  imports,
  providers: [],
  bootstrap: [AppComponent],
  declarations
})
export class AppModule {
}
