import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './models/role.model';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles$!: Observable<Array<Role>>;
  public totalInBackEnd!: number;
  public displayLimit!: number;
  public displayedColumns!: Array<string>;
  public displayedColumnsLabels!: Array<string>;
  @Output() onEdit = new EventEmitter<Role>();
  @Output() onConfigure = new EventEmitter<Role>();
  @Output() onNotice = new EventEmitter<Role>();

  constructor(private roleListService: RolesService) {}

  ngOnInit() {
    this.roles$ = this.roleListService.getRoles();
    this.displayedColumns = ['code', 'name', 'description'];
    this.displayedColumnsLabels = ['Id', 'Name', 'Informations'];
  }
  public edit(role: Role) {
     this.onEdit.emit(role);
  }

  public configure(role: Role) {
    this.onConfigure.emit(role);
  }

  public notice(role: Role) {
   this.onNotice.emit(role);
  }
}
