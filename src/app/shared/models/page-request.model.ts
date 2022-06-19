import { Sort } from "./generic-sort.model";
import { Sort as MatSortInterface } from "@angular/material/sort";

export interface PageRequest<T>{
    pageIndex: number;
    pageSize:number;
    sort?:Sort<T> | MatSortInterface | undefined;
}

