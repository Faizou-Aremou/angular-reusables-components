import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Sort } from "src/app/shared/models/generic-sort.model";
import { TableColumn } from "src/app/shared/models/table/table-column.model";
import { TableRow } from "src/app/shared/models/table/table-row.model";
import { CustomDataSource } from "src/app/shared/types/custom-data-source";
import { Company } from "../../../models/general-infos/company.model";
import { CompaniesService } from "../../services/companies.service";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"],
})
export class CompaniesComponent implements OnInit {
  public companiesTableQueryForm: FormGroup;
  public tableColumns: TableColumn[] = [
    {
      columnDef: "code",
      header: "Id",
    },
    {
      columnDef: "name",
      header: "Designation",
    },
  ];

  public tableRows: TableRow[]=[];
  public addActionsColumn = true;

  public initialSort: Sort<Company> = { active: "code", direction: "desc" };

  public dataSource = new CustomDataSource<Company>(
    (request, query) => this.companiesService.getCompanies(request, query),
    this.initialSort
  );
  @Output() company: EventEmitter<Company> = new EventEmitter();
  constructor(
    private companiesService: CompaniesService,
    private formBuilder: FormBuilder
  ) {
    this.companiesTableQueryForm = this.initiateFormBuilder();
  }

  ngOnInit() {}

  public onEditElement(company: Company): void {
    this.company.emit(company);
  }

  public onSubmit(): void {
    if (this.companiesTableQueryForm.valid) {
      this.dataSource.filterBy(this.companiesTableQueryForm.value);
    }
  }

  private initiateFormBuilder(): FormGroup {
    return this.formBuilder.group({
      code: [""],
      name: [""],
    });
  }
}
