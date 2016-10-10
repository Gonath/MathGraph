import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import {MathJaxDirective} from './mathjax.directive';
import {VisDirective} from './vis.directive';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MathJaxDirective, VisDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
 