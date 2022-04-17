import {
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
import { Sort } from '@angular/material/sort';
import { ACTIONS_BUTTONS_COLUMN } from '../../constants/table.constant';
import { TableColumnDirective } from '../../directives/table/table-column.directive';
import { TableConfig } from '../../models/table/table-config.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
  public ACTIONS_BUTTONS_COLUMN = ACTIONS_BUTTONS_COLUMN;
  @Input() public dataSource: Array<T> | null = [];
  @Input() public totalInBackEnd: number = 0;
  @Input() public displayLimit: number = 10;
  @Input() public displayedColumns: Array<string> = [];
  @Input() public displayedColumnsLabels: Array<string> = [];
  @Input() public addActionsColumn: boolean = false;
  @Input() public tableConfig!: TableConfig<T> | null;
  @Output() public changePage: EventEmitter<PageEvent> = new EventEmitter();
  @Output() public sortData: EventEmitter<Sort> = new EventEmitter();
  @ContentChild('actionsButton', { static: false })
  actionsButtonRef!: TemplateRef<any>;
  @ContentChildren(TableColumnDirective) tableColumnsRef!: QueryList<TableColumnDirective>;
  @ViewChild('paginator', { static: false }) paginator?: MatPaginator;

  public columns: Array<string>=[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [...this.displayedColumns, ...this.actionsColumn() ]
  }

  public onSortData(sort: Sort): void {
    this.sortData.emit(sort);
  }

  public onChangePage(pageEvent: PageEvent): void {
    this.changePage.emit(pageEvent);
  }

  private actionsColumn(): Array<string> {
    return this.addActionsColumn?[ACTIONS_BUTTONS_COLUMN]: []
  }
}
