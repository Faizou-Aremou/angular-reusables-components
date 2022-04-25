import { Pagination } from "./pagination.model";

export interface Page<T> extends Pagination{
    data:T[];
}