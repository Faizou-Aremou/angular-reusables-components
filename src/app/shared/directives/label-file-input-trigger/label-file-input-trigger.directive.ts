import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[labelFileInputTrigger]'
})
export class LabelFileInputTriggerDirective {
  constructor(public templateRef: TemplateRef<HTMLLabelElement>) { }
}
