import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { TabGroup } from '../models/tab-group/tab-group.model';
@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent<T> implements OnInit {
  @Input() public tabGroup: TabGroup<T> | null = null;
  @ContentChild('firstTabContent', { static: false })
  public firstTabContentRef!: TemplateRef<any>;
  @ContentChild('tabContent', { static: false })
  public tabContentRef!: TemplateRef<any>;
  constructor() {}
  ngOnInit(): void {}
}
