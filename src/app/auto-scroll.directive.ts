import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appAutoScroll]"
})
export class AutoScrollDirective {

  constructor(private _container: ElementRef) {
  }

  ngAfterViewChecked() {
    try {
      this._container.nativeElement.scrollTop
        = this._container.nativeElement.scrollHeight;
    } catch (e) {
      console.error(e);
    }
  }

}
