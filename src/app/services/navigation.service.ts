import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Link } from "../shared/models/link/link.model";
import { NaryNode } from "../shared/models/node.model";
import { PageRequest } from "../shared/models/page-request.model";
import { Page } from "../shared/models/page.model";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor() {}

  getLinkTree(
    request: PageRequest<NaryNode<Link>>,
    query: Partial<NaryNode<Link>> | undefined
  ): Observable<Page<NaryNode<Link>>> { // TODO: construct the tree from router
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
