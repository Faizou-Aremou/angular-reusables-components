import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabGroup } from 'src/app/shared/models/tab-group/tab-group.model';

@Component({
  selector: 'app-general-infos',
  templateUrl: './general-infos.component.html',
  styleUrls: ['./general-infos.component.scss']
})
export class GeneralInfosComponent implements OnInit {

  public tabGroup = new TabGroup(
    [
      {
        label: "Companies list"
      },
      {
        label: "Roles list"
      }
    ]
  )
  public companiesList$:Observable<any> | null= null;
  public rolesList$:Observable<any> | null= null;
  constructor() { }

  ngOnInit(): void {
  }

}
