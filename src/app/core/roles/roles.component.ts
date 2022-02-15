import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './models/role.model';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles$: Observable<Array<Role>>;
  public totalInBackEnd!: number;
  public displayLimit!: number;
  public displayedColumns!: Array<string>;
  public displayedColumnsLabels!: Array<string>;

  constructor(private roleListService: RolesService) {}

  ngOnInit() {
    this.roles$ = this.roleListService.getRoles();
    this.displayedColumns = ['code', 'name', 'description'];
    this.displayedColumnsLabels = ['Id', 'Name', 'Informations'];
  }
  public edit(elt: Role) {
    console.log('elt in edition', elt);
  }

  public configure(elt: Role) {
    console.log('elt in configuration', elt);
  }

  public notice(elt: Role) {
    console.log('elt in notification', elt);
  }
}
