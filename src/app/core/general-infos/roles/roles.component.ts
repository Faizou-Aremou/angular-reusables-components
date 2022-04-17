import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../models/general-infos/role.model';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles$!: Observable<Array<Role>>;
  public totalInBackEnd!: number;
  public displayLimit!: number;
  @Output() onEdit = new EventEmitter<Role>();
  @Output() onConfigure = new EventEmitter<Role>();
  @Output() onNotice = new EventEmitter<Role>();
  public displayedColumns = ['code', 'name', 'description'];
  public displayedColumnsLabels = ['Id', 'Name', 'Informations'];
  public addActionsColumn = true;

  constructor(private roleListService: RolesService) {}

  ngOnInit() {
    this.roles$ = this.roleListService.getRoles();
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
