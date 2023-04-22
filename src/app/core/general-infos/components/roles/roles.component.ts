import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Sort } from "src/app/shared/models/generic-sort.model";
import { TableColumn } from "src/app/shared/models/table/table-column.model";
import { PaginatedDataSource } from "src/app/shared/types/data-source/paginated-data-source";
import { Role } from "../../../models/general-infos/role.model";
import { RolesService } from "../../services/roles.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  @Output() onEdit = new EventEmitter<Role>();
  @Output() onConfigure = new EventEmitter<Role>();
  @Output() onNotice = new EventEmitter<Role>();
  public tableColumns: TableColumn[] = [
    {
      columnDef: "code",
      header: "Id"
    },
    {
      columnDef: "name",
      header: "Designation",
    },
    {
      columnDef: "description",
      header: "Information",
    },
    {
      columnDef: "actionsButton",
      header: ""
    }
  ];
  public initialSort: Sort<Role> = { active: "code", direction: "desc" };

  public dataSource = new PaginatedDataSource<Role>(
    (request, query) => this.roleListService.getRoles(request, query),
    this.initialSort,
  );
  constructor(private roleListService: RolesService) { }

  ngOnInit() { }
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
