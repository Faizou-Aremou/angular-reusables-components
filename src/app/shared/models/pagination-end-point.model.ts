import { Observable } from "rxjs";
import { PageRequest } from "./page-request.model";
import { Page } from "./page.model";

export type PaginationEndpoint<T> = (
  request: PageRequest<T>,
  query: Partial<T> | null
) => Observable<Page<T>>;
