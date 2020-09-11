import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

// Modules
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {RequestService} from './request.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgSelectModule, ReactiveFormsModule, HttpClientModule],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule {}
