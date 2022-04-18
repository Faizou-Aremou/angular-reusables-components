import { SortDirection } from "@angular/material/sort";


export interface Sort<T>{
    active: keyof T;
    direction: SortDirection;
}