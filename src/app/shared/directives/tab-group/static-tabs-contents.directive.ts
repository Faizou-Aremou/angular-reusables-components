import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appStaticTabsContent]',
})
export class StaticTabsContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
