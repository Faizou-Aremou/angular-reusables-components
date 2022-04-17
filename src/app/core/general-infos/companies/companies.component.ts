import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ACTIONS_BUTTONS_COLUMN } from 'src/app/shared/constants/table.constant';
import { Company } from '../../models/general-infos/company.model';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  public companies$!: Observable<Array<Company>>;
  public totalInBackEnd!: number;
  public displayLimit!: number;
  @Output() company:EventEmitter<Company> = new EventEmitter();
  public displayedColumns = ['code', 'name'];
  public displayedColumnsLabels = ['Id', 'Name'];
  public addActionsColumn = true;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {
    this.companies$ = this.companiesService.getCompanies();
  }

  public onEditElement(company:Company):void{
      this.company.emit(company);
  }
}
