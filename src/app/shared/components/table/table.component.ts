import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ACTIONS_BUTTONS_COLUMN } from '../../constants/table.constant';
import { TableColumnDirective } from '../../directives/table/table-column.directive';
import { PaginatedDataSource } from '../../types/paginated-data-source.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit, AfterViewInit  {
  public ACTIONS_BUTTONS_COLUMN = ACTIONS_BUTTONS_COLUMN;
  /**
   * we will not be using the built-in MatTableDataSource because its designed for filtering,
   * sorting and pagination of a client-side data array.
   * In most real app these are happened on server side.
   */
  @Input() public dataSource: PaginatedDataSource<T> | null=null;
  @Input() public displayedColumns: Array<string> = [];
  @Input() public displayedColumnsLabels: Array<string> = [];
  @Input() public addActionsColumn: boolean = false;
  @ContentChild('actionsButton', { static: false })
  actionsButtonRef!: TemplateRef<any>;
  @ContentChildren(TableColumnDirective) tableColumnsRef!: QueryList<TableColumnDirective>;
  @ViewChild('paginator', { static: false }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: false  }) matSort: MatSort| null = null;
  public columns: Array<string>=[];

  constructor() {}

  ngOnInit(): void {
    
    this.columns = [...this.displayedColumns, ...this.actionsColumn() ]
  }
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.matSort = this.matSort
    }
  }

  private actionsColumn(): Array<string> {
    return this.addActionsColumn?[ACTIONS_BUTTONS_COLUMN]: []
  }
}
