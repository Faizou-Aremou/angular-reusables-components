import { DataSource } from "@angular/cdk/collections";
import {
  BehaviorSubject,
  EMPTY,
  filter,
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { Page } from "../models/table/page.model";
import { PaginationEndpoint } from "../models/table/pagination-end-point.model";
import { Sort } from "../models/table/generic-sort.model";
import { MatSort, Sort as MatSortInterface } from "@angular/material/sort";

export class PaginatedDataSource<T> extends DataSource<T> {
  private _pageNumber = new Subject<number>();
  private _sort: BehaviorSubject<Sort<T> | MatSortInterface>;
  public page$: Observable<Page<T>>;
  private _matSort: MatSort | null = null;

  get matSort(): MatSort | null {
    return this._matSort;
  }
  set matSort(matSort: MatSort | null) {
    this._matSort = matSort;
    if (matSort !== null) {
      matSort.sortChange.pipe().subscribe((matSortInterface) => {
        this._sort.next(matSortInterface);
      });
    }
  }

  constructor(
    endPoint: PaginationEndpoint<T>,
    initialSort: Sort<T>,
    size = 10
  ) {
    super();
    this._sort = new BehaviorSubject<Sort<T> | MatSortInterface>(initialSort);
    this.page$ = this._sort.pipe(
      switchMap((sort) =>
        this._pageNumber.pipe(
          startWith(0),
          switchMap((page) =>
            endPoint({
              page,
              sort,
              size,
            })
          )
        )
      ),
      shareReplay(1)
    );
  }

  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this._sort.getValue();
    const nextSort = { ...lastSort, ...sort } as Sort<T> | MatSortInterface;
    this._sort.next(nextSort);
  }

  fetch(page: number): void {
    this._pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(
      map((page) => page.content)
    );
  }

  disconnect(): void {}

}
