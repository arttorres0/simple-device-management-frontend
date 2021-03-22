import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumbersOnlyDirective } from "./directives/numbers-only.directive";
import { LettersOnlyDirective } from "./directives/letters-only.directive";

@NgModule({
  declarations: [NumbersOnlyDirective, LettersOnlyDirective],
  imports: [CommonModule],
  exports: [NumbersOnlyDirective, LettersOnlyDirective],
})
export class SharedModule {}
