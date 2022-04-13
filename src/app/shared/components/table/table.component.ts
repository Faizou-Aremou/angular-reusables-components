import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TableConfig } from '../../models/table/table-config.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
  // @Input() public loading!: boolean;
  @Input() public dataSource: Array<T> | null = [];
  @Input() public totalInBackEnd: number = 0;
  @Input() public displayLimit: number = 10;
  @Input() public displayedColumns: Array<string> = [];
  @Input() public displayedColumnsLabels: Array<string> = [];
  @Input() public tableConfig!: TableConfig<T> | null;
  @Output() public editElement: EventEmitter<T> = new EventEmitter();
  @Output() public changePage: EventEmitter<PageEvent> = new EventEmitter();
  @Output() public sortData: EventEmitter<Sort> = new EventEmitter();
  @ContentChild('actionsButton', { static: false })
  actionsButtonRef!: TemplateRef<any>;
  public tableRows!: Array<string>;

  @ViewChild('paginator', { static: false }) paginator?: MatPaginator;

  // TODO Use role instead ! It's temporary solution until we got Roles.
  public isAdminMenu!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.tableRows = [...this.displayedColumns, 'action'];
  }

  public onEditElement(elt: T) {
    this.editElement.emit(elt);
  }

  public onSortData(sort: Sort): void {
    this.sortData.emit(sort);
  }

  public onChangePage(pageEvent: PageEvent): void {
    this.changePage.emit(pageEvent);
  }
}
