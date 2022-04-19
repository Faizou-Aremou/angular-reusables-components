import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request.model';
import { Page } from 'src/app/shared/models/page.model';
import { Role } from '../../models/general-infos/role.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor() {}

  public getRoles(request: PageRequest<Role>): Observable<Page<Role>> {
    console.log('page request',request);
    return of(
      {
        content: [ {
          code: '001',
          name: 'Agnidé',
          description: 'Front-end developper',
        }, {
          code: '002',
          name: 'Faizou',
          description: 'Programmer',
        }],
        totalElements: 2,
        size:2,
        number: 0,
      },
    );
  }
}
