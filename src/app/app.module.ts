import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { InputComponent } from './input/input.component';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers';

@NgModule({
  declarations: [AppComponent, ItemComponent, InputComponent],
  imports: [BrowserModule, HttpClientModule, StoreModule.forRoot(todoReducer)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
