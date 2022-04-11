import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { StaticTabsContentDirective } from '../directives/static-tabs-contents.directive';
import { TabGroup } from '../models/tab-group/tab-group.model';
@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent<T> implements OnInit {
  @Input() public tabGroup: TabGroup<T> | null = null;
  @ContentChildren(StaticTabsContentDirective)
  public staticTabsContentRefs: QueryList<StaticTabsContentDirective>| null = null;
  @ContentChild('tabContent', { static: false })
  public dynamicTabsContentRef: TemplateRef<any> | null = null;
  constructor() {}
  ngOnInit(): void {}
}
