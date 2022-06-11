import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ACTIONS_BUTTON_COLUMN } from '../../consts/table/actions-button-column.const';
import { TableColumnDirective } from '../../directives/table/table-column.directive';
import { TableColumn } from '../../models/table/table-column.model';
import { CustomDataSource } from '../../types/custom-data-source';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T, Q> implements OnInit, AfterViewInit  {
  public ACTIONS_BUTTONS_COLUMN = ACTIONS_BUTTON_COLUMN;
  /**
   * we will not be using the built-in MatTableDataSource because its designed for filtering, sorting and pagination of a client-side data array.
   * In most real app these are happened on server side.
   */
  @Input() public dataSource: CustomDataSource<T, Q> | null=null;
  @Input() public tableColumns: Array<TableColumn> = [];
  @Input() public addActionsColumn: boolean = false;
  @ContentChild('actionsButton', { static: false })
  actionsButtonRef!: TemplateRef<any>;
  @ContentChildren(TableColumnDirective) tableColumnsRef!: QueryList<TableColumnDirective>;
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator| null=null;
  @ViewChild(MatSort, { static: false  }) matSort: MatSort| null = null;
  public columns: Array<string>=[];
  public displayedColumns: Array<string> = [];
  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((column)=> column.columnDef);
    this.columns = [...this.displayedColumns, ...this.actionsColumn() ];
  }
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.matSort = this.matSort;
      this.dataSource.matPaginator = this.matPaginator;
    }
  }

  private actionsColumn(): Array<string> {
    return this.addActionsColumn?[ACTIONS_BUTTON_COLUMN]: []
  }
}
