import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Navbar } from './shared/models/navbar/navbar.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  navbar: Navbar = new Navbar([{label:'test', href:'#', target:"test-target"}])
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
