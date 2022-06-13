import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[actionsButton]'
})
export class ActionsButtonDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
