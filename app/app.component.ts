import { Component, ElementRef } from '@angular/core';

//declare var vis;


@Component({
  selector: 'my-app',
  template: `
                <h1>MathGraph</h1>
                <p>
                  Relation 1 : a \\in b
                </p>
                <p>
                  Relation 2 : 2^2=4
                </p>
                <div id="mynetwork" [mynetwork] syle="border:'1px solid'"></div>
            `
})
export class AppComponent {
    constructor(){
    }
}