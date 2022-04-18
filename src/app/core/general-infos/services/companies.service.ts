import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/table/page-request.model';
import { Page } from 'src/app/shared/models/table/page.model';
import { Company } from '../../models/general-infos/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor() {}

  public getCompanies(request: PageRequest<Company>): Observable<Page<Company>> {
    return of(
      {
        content:[ {
          code: 'earrteyd',
          name: 'Google',
          description: 'Google enterprise',
        }],
        totalElements: 3,
        size:1,
        number: 0,
      },
    );
  }
}
