import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OverrideTableColumnDirective } from '../../directives/override-table-column/override-table-column.directive';
import { TableColumn } from '../../models/table/table-column.model';
import { OverrideTableColumnHeaderDirective } from '../../directives/override-table-column-header/override-table-column-header.directive';
import { AccordionTableGroup } from '../../services/table/accordion-table.service';



@Component({
  selector: 'app-accordion-table',
  templateUrl: './accordion-table.component.html',
  styleUrls: ['./accordion-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionTableComponent<T> implements OnInit {
  /**
   * we will not be using the built-in MatTableDataSource because its designed for filtering, sorting and pagination of a client-side data array.
   * In most real app these are happened on server side.
   */
  @Input() data?: (AccordionTableGroup | T)[];
  @Input() groupColumn?: TableColumn;
  @Output() matPaginator = new EventEmitter<MatPaginator>();
  @Output() matSort = new EventEmitter<MatSort>();
  @Output() groupHeaderClicked = new EventEmitter<AccordionTableGroup>();
  @ContentChildren(OverrideTableColumnDirective) OverrideTableColumnDirs?: QueryList<OverrideTableColumnDirective>;
  @ContentChildren(OverrideTableColumnHeaderDirective) OverrideTableColumnHeaderDirs?: QueryList<OverrideTableColumnHeaderDirective>;
  columnDefs: Array<string> = [];
  private _tableColumns: Array<TableColumn> = [];
  constructor() { }
  @Input() set tableColumns(value: Array<TableColumn>) {
    this._tableColumns = value;
    this.columnDefs = this._tableColumns.map((column) => column.columnDef);
  }
  get tableColumns() {
    return this._tableColumns;
  }
  @ViewChild(MatPaginator, { static: false }) set emitMatPaginator(value: MatPaginator) {
    if (value) {
      this.matPaginator.emit(value);
    }
  };
  @ViewChild(MatSort, { static: false }) set emitMatSort(value: MatSort) {
    if (value) {
      this.matSort.emit(value);
    }
  };

  ngOnInit(): void {
  }

  isGroup(index: number, item: AccordionTableGroup | T): boolean {
    if (item instanceof AccordionTableGroup) {
      return true
    }
    return false;
  }
  groupHeaderClick(row: AccordionTableGroup): void {
    this.groupHeaderClicked.emit(row);
  }
}