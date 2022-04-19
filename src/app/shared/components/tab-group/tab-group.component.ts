import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { StaticTabsContentDirective } from '../../directives/tab-group/static-tabs-contents.directive';
import { TabGroup } from '../../types/tab-group/tab-group';
@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent<T> implements OnInit{
  @Input() public tabGroup: TabGroup<T> | null = null;
  @ContentChildren(StaticTabsContentDirective)
  public staticTabsContentRefs: QueryList<StaticTabsContentDirective> | null = null;
  @ContentChild('dynamicTabsContent', { static: false })
  public dynamicTabsContentRef: TemplateRef<any> | null = null;
  constructor() {}
  ngOnInit(): void {
  }

}
