import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Sort } from 'src/app/shared/models/generic-sort.model';
import { TableColumn } from 'src/app/shared/models/table/table-column.model';
import { CustomDataSource } from 'src/app/shared/types/custom-data-source';
import { CompanyQuery } from '../../models/general-infos/company-query.model';
import { Company } from '../../models/general-infos/company.model';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  public tableColumns: TableColumn[]= [
    {
      columnDef:'code',
       header:'Id'
      }, 
    {
      columnDef:'name',
       header: 'Designation'
      }
  ];
  public addActionsColumn = true;

  public initialSort: Sort<Company> = {active: 'code', direction: 'desc'};

  public dataSource = new CustomDataSource<Company, CompanyQuery>(
    (request, query )=> this.companiesService.getCompanies(request, query),
    this.initialSort
  )
  @Output() company:EventEmitter<Company> = new EventEmitter();
  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {
  }

  public onEditElement(company:Company):void{
      this.company.emit(company);
  }
}
