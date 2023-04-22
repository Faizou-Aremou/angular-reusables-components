import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
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
    ).pipe(delay(500), map((roles)=> this.adaptToRoles(roles)));
  }

  private adaptToRoles(roles: { data: Role[]; pageIndex: number; pageSize: number; length: number; }): { data: Role[]; pageIndex: number; pageSize: number; length: number; } {
    const { data, ...rest } = roles
    const actionnableData = data.map((company) => {
      return { ...company, actionsButton: "" }
    });
    return {...rest, data:actionnableData} 
  }
}
