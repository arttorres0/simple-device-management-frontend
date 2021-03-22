import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[lettersOnly]",
})
export class LettersOnlyDirective {
  constructor(private _el?: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event) {
    const initialValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initialValue.replace(/[^a-zA-Z]*/g, "");
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
