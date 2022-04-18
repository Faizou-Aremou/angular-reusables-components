import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/table/page-request.model';
import { Page } from 'src/app/shared/models/table/page.model';
import { Role } from '../../models/general-infos/role.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor() {}

  public getRoles(request: PageRequest<Role>): Observable<Page<Role>> {
    return of(
      {
        content: [ {
          code: 'cadre',
          name: 'Agnidé',
          description: 'Front',
        }, {
          code: 'cadre',
          name: 'Faizou',
          description: 'Programmer',
        }],
        totalElements: 15,
        size:2,
        number: 0,
      },
    );
  }
}
