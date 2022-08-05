import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../models/link/link.model';
import { NaryNode } from '../../models/node.model';
import { ExtendedNestedTreeControl } from '../../types/control/extended-nested-tree-control';
import { PaginatedDataSource } from '../../types/data-source/paginated-data-source';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() dataSource?: PaginatedDataSource<NaryNode<Link>>;
  @Input() treeControl?: ExtendedNestedTreeControl<NaryNode<Link>>;
  constructor() { }

  ngOnInit(): void {
  }
  hasChild = (_: number, node: NaryNode<Link>) => !!node.children && node.children.length > 0;
}
