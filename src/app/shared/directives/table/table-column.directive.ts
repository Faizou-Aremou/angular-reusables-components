import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumnDef]'
})
export class TableColumnDirective {
  @Input() tableColumnDef: string | null= null
  constructor(public templateRef: TemplateRef<any>) { }

}
