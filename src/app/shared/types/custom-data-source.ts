import { DataSource } from "@angular/cdk/collections";
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  share,
  startWith,
  Subject,
  Subscription,
  switchMap,
  withLatestFrom,
} from "rxjs";
import { PaginationEndpoint } from "../models/pagination-end-point.model";
import { MatSort, Sort as MatSortInterface } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Page } from "../models/page.model";
import { Sort } from "../models/generic-sort.model";
import { Pagination } from "../models/pagination.model";

export class CustomDataSource<T, Q> extends DataSource<T> {
  private _pageIndex = new Subject<number>();
  private _sort: BehaviorSubject<Sort<T> | MatSortInterface>;
  private _page$: Observable<Page<T>>;
  private _matSort: MatSort | null = null;
  private _matPaginator: MatPaginator | null = null;
  private _matPaginatorSubscription = Subscription.EMPTY;
  private _matSortSubscription = Subscription.EMPTY;
  private _query: BehaviorSubject<Q | null>;

  /** stream that contain displayed page data */
  private _renderData$: Observable<T[]>;

  pagination$: Observable<Pagination>;
  get matPaginator(): MatPaginator | null {
    return this._matPaginator;
  }
  set matPaginator(value: MatPaginator | null) {
    this._matPaginator = value;
    if (this._matPaginator !== null) {
      this._matPaginatorSubscription.unsubscribe();
      const pageChange = merge(
        this._matPaginator.page,
        this._matPaginator.initialized
      );
      this._matPaginatorSubscription = pageChange
        .pipe(withLatestFrom(this.pagination$))
        .subscribe(([pageEvent, pagination]) => {
          if (pageEvent) {
            this._pageIndex.next(pageEvent.pageIndex);
          } else {
            this._updateMatPaginator(pagination);
          }
        });
    }
  }

  get matSort(): MatSort | null {
    return this._matSort;
  }
  set matSort(value: MatSort | null) {
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
    initialQuery: Q | null = null,
    pageSize = 10
  ) {
    super();
    this._sort = new BehaviorSubject<Sort<T> | MatSortInterface>(initialSort);
    this._query = new BehaviorSubject<Q | null>(initialQuery);
    this._page$ = combineLatest([this._sort, this._query]).pipe(
      switchMap(([sort, query]) =>
        this._pageIndex.pipe(
          startWith(0),
          switchMap((pageIndex) =>
            endPoint(
              {
                pageIndex,
                sort,
                pageSize,
              },
              query
            )
          )
        )
      ),
      share()
    );

    this._renderData$ = this._page$.pipe(
      map((page) => {
        this._updateMatPaginator(this._paginationFor(page));
        return page.data;
      })
    );

    this.pagination$ = this._page$.pipe(
      map((page) => {
        return this._paginationFor(page);
      })
    );
  }

  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this._sort.getValue();
    const nextSort = { ...lastSort, ...sort } as Sort<T> | MatSortInterface;
    this._sort.next(nextSort);
  }

  queryBy(query: Q): void {
    const lastQuery = this._query.getValue();
    const nextQuery = { ...lastQuery, ...query };
    this._query.next(nextQuery);
  }

  fetch(pageEvent: PageEvent): void {
    this._pageIndex.next(pageEvent.pageIndex);
  }

  private _updateMatPaginator(pagination: Pagination): void {
    if (!this.matPaginator) {
      return;
    }
    this.matPaginator.length = pagination.length;
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
    const { data, ...pagination } = page;
    return pagination;
  }
  connect(): Observable<T[]> {
    return this._renderData$;
  }

  disconnect(): void {
    this._matPaginatorSubscription.unsubscribe();
    this._matSortSubscription.unsubscribe();
  }
}
