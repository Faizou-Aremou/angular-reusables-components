import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[staticTabsContents]',
})
export class StaticTabsContentsDirective {
  constructor(templateRef: TemplateRef<any>) {}
}
