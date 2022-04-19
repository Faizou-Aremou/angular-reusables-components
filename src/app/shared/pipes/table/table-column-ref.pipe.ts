import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { TableColumnDirective } from '../../directives/table/table-column.directive';

@Pipe({
  name: 'tableColumnRef'
})
export class TableColumnRefPipe implements PipeTransform {

  transform(columnId: string, tableColumns: QueryList<TableColumnDirective>): TableColumnDirective | undefined  {
    return tableColumns.find((column) => column.tableColumnDef === columnId) ?? undefined;
  }

}
