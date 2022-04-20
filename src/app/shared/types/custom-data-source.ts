import { DataSource } from "@angular/cdk/collections";
import {
  BehaviorSubject,
  combineLatest,
  from,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from "rxjs";
import { PaginationEndpoint } from "../models/pagination-end-point.model";
import { MatSort, Sort as MatSortInterface } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Page } from "../models/page.model";
import { Sort } from "../models/generic-sort.model";
import { Pagination } from "../models/pagination.model";

export class CustomDataSource<T, Q> extends DataSource<T> {
  private _pageNumber = new Subject<number>();
  private _sort: BehaviorSubject<Sort<T> | MatSortInterface>;
  private _page$: Observable<Page<T>>;
  private _matSort: MatSort | null = null;
  private _matPaginator: MatPaginator | null = null;
  private _matPaginatorSubscription = Subscription.EMPTY;
  private _matSortSubscription = Subscription.EMPTY;
  private _query: BehaviorSubject<Q>;
  private _content$: Observable<T[]>;
  public pagination$: Observable<Pagination>;
  public get matPaginator(): MatPaginator | null {
    return this._matPaginator;
  }
  public set matPaginator(value: MatPaginator | null) {
    this._matPaginator = value;
    if (this._matPaginator !== null) {
      this._matPaginatorSubscription.unsubscribe();
      const pageChange = merge(
        this._matPaginator.page,
        this._matPaginator.initialized
      );
      this._matPaginatorSubscription = combineLatest([
        pageChange,
        this.pagination$,
      ])
        .pipe()
        .subscribe(([pageEvent, pagination]) => {
          this._updateMatPaginator(pagination);
          pageEvent ? this._pageNumber.next(pageEvent.pageIndex) : null;
        });
    }
  }

  public get matSort(): MatSort | null {
    return this._matSort;
  }
  public set matSort(value: MatSort | null) {
    this._matSort = value;
    if (this._matSort !== null) {
      this._matSortSubscription.unsubscribe();
      this._matSortSubscription = this._matSort.sortChange.subscribe(
        (matSortInterface) => {
          this._sort.next(matSortInterface);
        }
      );
    }
  }

  constructor(
    endPoint: PaginationEndpoint<T, Q>,
    initialSort: Sort<T>,
    initialQuery: Q,
    size = 10
  ) {
    super();
    this._sort = new BehaviorSubject<Sort<T> | MatSortInterface>(initialSort);
    this._query = new BehaviorSubject<Q>(initialQuery);
    this._page$ = combineLatest([this._sort, this._query]).pipe(
      switchMap(([sort, query]) =>
        this._pageNumber.pipe(
          startWith(0),
          switchMap((page) =>
            endPoint(
              {
                page,
                sort,
                size,
              },
              query
            )
          )
        )
      )
    );

    this._content$ = from(this._page$).pipe(
      map((page) => {
        this._updateMatPaginator(this._paginationFor(page));
        return page.content;
      })
    );
    //latestWith
    this.pagination$ = from(this._page$).pipe(
      map((page) => {
        return this._paginationFor(page);
      })
    );
  }
  //latestWith
  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this._sort.getValue();
    const nextSort = { ...lastSort, ...sort } as Sort<T> | MatSortInterface;
    this._sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this._query.getValue();
    const nextQuery = { ...lastQuery, ...query };
    this._query.next(nextQuery);
  }

  fetch(pageEvent: PageEvent): void {
    this._pageNumber.next(pageEvent.pageIndex);
  }

  private _updateMatPaginator(pagination: Pagination): void {
    if (!this.matPaginator) {
      return;
    }
    this.matPaginator.length = pagination.totalElements;
    if (this.matPaginator.pageIndex > 0) {
      const lastPageIndex =
        Math.ceil(this.matPaginator.length / this.matPaginator.pageSize) - 1 ||
        0;
      const newPageIndex = Math.min(this.matPaginator.pageIndex, lastPageIndex);

      if (newPageIndex !== this.matPaginator.pageIndex) {
        this.matPaginator.pageIndex = newPageIndex;
      }
    }
  }

  private _paginationFor(page: Page<T>): Pagination {
    const { content, ...pagination } = page;
    return pagination;
  }
  connect(): Observable<T[]> {
    return this._content$;
  }

  disconnect(): void {}
}
