import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor() {}

  public getRoles(): Observable<Array<Role>> {
    return of([
      {
        code: 'azertt',
        name: 'user',
        description: 'alows helpdesk',
      },
    ]);
  }
}
