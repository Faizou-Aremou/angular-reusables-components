import { Sort } from "./generic-sort.model";
import { Sort as MatSortInterface } from "@angular/material/sort";

export interface PageRequest<T>{
    page: number;
    size:number;
    sort?:Sort<T> | MatSortInterface;
}

