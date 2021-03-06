import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumnDirective } from '../../directives/table-column/table-column.directive';
import { OverrideTableColumnDirective } from '../../directives/override-table-column/override-table-column.directive';
import { TableColumn } from '../../models/table/table-column.model';
import { PaginatedDataSource } from '../../types/data-source/paginated-data-source';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit, AfterViewInit, AfterContentInit  {
  /**
   * we will not be using the built-in MatTableDataSource because its designed for filtering, sorting and pagination of a client-side data array.
   * In most real app these are happened on server side.
   */
  @Input() dataSource?: PaginatedDataSource<T>;
  @Input() tableColumns: Array<TableColumn> = []; //TODO: dataSource and table column in the same object
  @ContentChildren(TableColumnDirective) additionalTableColumnDirs?:QueryList<TableColumnDirective>;
  @ContentChildren(OverrideTableColumnDirective) OverrideTableColumnsDirs?: QueryList<OverrideTableColumnDirective>;
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator| null=null;
  @ViewChild(MatSort, { static: false  }) matSort: MatSort| null = null;
  columns: Array<string>=[];
  displayedColumns: Array<string> = [];
  constructor() {}
  ngAfterContentInit(): void {
    this.displayedColumns = this.tableColumns.map((column)=> column.columnDef);
    this.columns = [...this.displayedColumns, ...this.actionsColumn() ];
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.matSort = this.matSort;
      this.dataSource.matPaginator = this.matPaginator;
    }
  }

  private actionsColumn(): Array<string> {
    return this.additionalTableColumnDirs?this.additionalTableColumnDirs.map((TableColumnDir)=> TableColumnDir.tableColumn): []
  }
}
