import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumn]'
})
export class TableColumnDirective {
  @Input() tableColumn: string | null= null
  constructor(public templateRef: TemplateRef<any>) { }

}
