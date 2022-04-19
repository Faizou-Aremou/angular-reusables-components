import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request.model';
import { Page } from 'src/app/shared/models/page.model';
import { Company } from '../../models/general-infos/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor() {}

  public getCompanies(request: PageRequest<Company>): Observable<Page<Company>> {
    console.log('page request',request);
    return of(
      {
        content:[ {
          code: '001',
          name: 'Google',
          description: 'Google enterprise',
        }],
        totalElements: 1,
        size:1,
        number: 0,
      },
    );
  }
}
