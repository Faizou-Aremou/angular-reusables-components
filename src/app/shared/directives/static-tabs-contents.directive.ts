import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[staticTabsContents]',
})
export class StaticTabsContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
