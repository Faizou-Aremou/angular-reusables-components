import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Link } from "../shared/models/link/link.model";
import { DataNode } from "../shared/models/node.model";
import { PageRequest } from "../shared/models/page-request.model";
import { Page } from "../shared/models/page.model";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor() {}

  getLinkTree(
    request: PageRequest<DataNode<Link>>,
    query: Partial<DataNode<Link>> | undefined
  ): Observable<Page<DataNode<Link>>> {
    return of({
      data: [
        {
          element: { label: "test", href: "#", target: "string" },
        },
        {
          element: { label: "test", href: "#", target: "string" },
          children: [{ element: {label:"book", href:"#", target: "string"}}, {element:{label:"book", href:"#", target: "string"}}]
        },
      ],
      length: 2,
      pageSize: 2,
      pageIndex: 0,
    });
  }
}
