import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './models/company.model';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  public companies$!: Observable<Array<Company>>;
  public totalInBackEnd!: number;
  public displayLimit!: number;
  public displayedColumns!: Array<string>;
  public displayedColumnsLabels!: Array<string>;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {
    this.companies$ = this.companiesService.getCompanies();
    this.displayedColumns = ['code', 'name'];
    this.displayedColumnsLabels = ['Id', 'Name'];
  }
}
