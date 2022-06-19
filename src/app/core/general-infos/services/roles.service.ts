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

  public getRoles(request: PageRequest<Role>, query: Partial<Role> | undefined): Observable<Page<Role>> {
    console.log('page role request',request);
    return of(
      {
        data: [ {
          code: '001',
          name: 'Agnidé',
          description: 'Front-end developper',
        }, {
          code: '002',
          name: 'Faizou',
          description: 'Programmer',
        }],
        length: 2,
        pageSize:2,
        pageIndex: 0,
      },
    );
  }
}
