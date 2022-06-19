import { ChangeDetectionStrategy, Component} from '@angular/core';
import { NavigationService } from './services/navigation-service';
import { Sort } from './shared/models/generic-sort.model';
import { Link } from './shared/models/link/link.model';
import { Navbar } from './shared/models/navbar/navbar.model';
import { DataNode } from './shared/models/node.model';
import { ExtendedNestedTreeControl } from './shared/types/control/extended-nested-tree-control';
import { PaginatedDataSource } from './shared/types/data-source/paginated-data-source';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  dataSource = new PaginatedDataSource<DataNode<Link>>(
    (request, query) => this.navigationService.getLinkTree(request, query),
  );

  treeControl = new ExtendedNestedTreeControl<DataNode<Link>>(node => node.children);
  constructor(
    private navigationService: NavigationService
  ){

  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
