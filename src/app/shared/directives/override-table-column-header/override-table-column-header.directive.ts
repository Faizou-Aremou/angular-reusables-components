import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[overrideTableColumnHeader]'
})
export class OverrideTableColumnHeaderDirective {
  @Input() overrideTableColumnHeader: string | null= null
  constructor(public templateRef: TemplateRef<HTMLElement>) { }

}
