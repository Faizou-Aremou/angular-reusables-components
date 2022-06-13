import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[overrideTableColumn]'
})
export class OverrideTableColumnDirective {
  @Input() overrideTableColumn: string | null= null
  constructor(public templateRef: TemplateRef<any>) { }

}
