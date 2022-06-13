import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { OverrideTableColumnDirective } from '../../directives/override-table-column/override-table-column.directive';

@Pipe({
  name: 'tableColumn'
})
export class TableColumnPipe implements PipeTransform {

  transform(columnId: string, tableColumns: QueryList<OverrideTableColumnDirective> | undefined): OverrideTableColumnDirective | undefined  {
    return tableColumns?.find((column) => column.overrideTableColumn === columnId) ?? undefined;
  }

}
