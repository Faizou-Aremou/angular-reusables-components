import { DynamicTab } from './dynamic-tab.model';
import { StaticTab } from './tab.model';

const STATIC_TABS_NUMBER = 1;
export class TabGroup<T> {
  private _staticTabs: Array<StaticTab> = [];
  private _dynamicTabs: Array<DynamicTab<T>> = [];

  constructor(staticTabs: Array<Omit<StaticTab, 'index'>>) {
    this._staticTabs = staticTabs.map((tab, i) => {
      return { ...tab, index: i + STATIC_TABS_NUMBER };
    });
  }
  public selectedTab = STATIC_TABS_NUMBER;
  public addTabDynamically(dynamicTab: Omit<DynamicTab<T>, 'index'>): void {
    this._dynamicTabs = [
      ...this._dynamicTabs,
      { ...dynamicTab, index: this._dynamicTabs.length + STATIC_TABS_NUMBER },
    ];
    this.selectedTab = this._dynamicTabs.length;
  }
  public deleteTab(tabNumber: number): void {
    if (tabNumber - this._staticTabs.length > 0) {
      this._dynamicTabs.filter(
        (tab, index) => index === tabNumber - this._staticTabs.length - 1
      );

      const tabsUpperDeleteTab = this._dynamicTabs.slice(
        tabNumber - this._staticTabs.length - 1
      );
      const tabsUpperDeleteTabNumberTabUpdated = tabsUpperDeleteTab.map(
        (tab) => {
          return { ...tab, index: tab.index - 1 };
        }
      );
      this._dynamicTabs = [
        ...this._dynamicTabs.slice(0, tabNumber - this._staticTabs.length),
        ...tabsUpperDeleteTabNumberTabUpdated,
      ];
      this.selectedTab =
        tabNumber - this._staticTabs.length < this._dynamicTabs.length
          ? tabNumber
          : tabNumber - 1;
    }
  }
}

export interface UpdateTabInfos<T> {
  label?: string;
  content?: T;
  loading?: boolean;
}
