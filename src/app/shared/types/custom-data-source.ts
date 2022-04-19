import { DataSource } from "@angular/cdk/collections";
import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  switchMap
} from "rxjs";
import { PaginationEndpoint } from "../models/pagination-end-point.model";
import { MatSort, Sort as MatSortInterface} from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Page } from "../models/page.model";
import { Sort } from "../models/generic-sort.model";

export class CustomDataSource<T> extends DataSource<T> {
  private _pageNumber = new Subject<number>();
  private _sort: BehaviorSubject<Sort<T> | MatSortInterface>;
  public page$: Observable<Page<T>>;
  private _matSort: MatSort | null = null;
  private _matPaginator: MatPaginator | null = null;
  private _matPaginatorSubscription = Subscription.EMPTY;
  private _matSortSubscription = Subscription.EMPTY;;
  public get matPaginator(): MatPaginator | null {
    return this._matPaginator;
  }
  public set matPaginator(value: MatPaginator | null) {
    this._matPaginator = value;
    if (this._matPaginator !==null){
      this._matPaginatorSubscription.unsubscribe();
      this._matPaginatorSubscription = this._matPaginator.page
        .subscribe((pageEvent)=> {
          this._pageNumber.next(pageEvent.pageIndex);
        })
    }
  }

  public get matSort(): MatSort | null {
    return this._matSort;
  }
  public set matSort(value: MatSort | null) {
    this._matSort = value;
    if (this._matSort !== null) {
      this._matSortSubscription.unsubscribe();
      this._matSortSubscription = this._matSort.sortChange.subscribe((matSortInterface) => {
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

  fetch(pageEvent: PageEvent): void {
    this._pageNumber.next(pageEvent.pageIndex);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(
      map((page) => page.content)
    );
  }

  disconnect(): void {}

}
