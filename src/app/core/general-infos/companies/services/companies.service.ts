import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor() {}

  public getCompanies(): Observable<Array<Company>> {
    return of([
      {
        code: 'earrteyd',
        name: 'Google',
        description: 'Google enterprise',
      },
    ]);
  }
}
