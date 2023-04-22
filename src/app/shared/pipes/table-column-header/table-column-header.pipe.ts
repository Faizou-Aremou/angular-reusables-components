import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { OverrideTableColumnHeaderDirective } from '../../directives/override-table-column-header/override-table-column-header.directive';


@Pipe({
  name: 'tableColumnHeader'
})
export class TableColumnHeaderPipe implements PipeTransform {

  transform(columnId: string, tableColumns: QueryList<OverrideTableColumnHeaderDirective> | undefined): OverrideTableColumnHeaderDirective | undefined {
    return tableColumns?.find((column) => column.overrideTableColumnHeader === columnId) ?? undefined;
  }

}
