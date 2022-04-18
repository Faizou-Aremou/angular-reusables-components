import { Observable } from "rxjs";
import { PageRequest } from "./page-request.model";
import { Page } from "./page.model";

export type PaginationEndpoint<T> = (req: PageRequest<T>) => Observable<Page<T>>