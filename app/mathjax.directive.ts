import {Directive, ElementRef, OnChanges, Input} from "@angular/core";
declare var MathJax: {
  Hub: {
    Queue: (param: Object[]) => void;
  }
}

@Directive({selector: '[mathJax]'})

export class MathJaxDirective implements OnChanges {
    
  // Default value set to ""
  private __defaultValue = "";
  // Get the bound Input
  @Input("mathJax") private value: string;
  
  constructor(private element: ElementRef) {
      this.element.nativeElement.innerHTML = this.__defaultValue;
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
      
  }
  
  ngOnChanges() {
      this.element.nativeElement.innerHTML = this.value;
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }

}