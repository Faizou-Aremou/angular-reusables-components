import { Observable } from "rxjs";
import { PageRequest } from "./page-request.model";
import { Page } from "./page.model";

export type PaginationEndpoint<T, Q> = (
  request: PageRequest<T>,
  query: Q
) => Observable<Page<T>>;
