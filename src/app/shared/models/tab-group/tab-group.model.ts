import { DynamicTab } from './dynamic-tab.model';
import { StaticTab } from './static-tab.model';

const STATIC_TABS_NUMBER = 0;
export class TabGroup<T> {
  private _staticTabs: Array<StaticTab> = [];
  private _dynamicTabs: Array<DynamicTab<T>> = [];
  
  public get staticTabs(): Array<StaticTab> {
      return this._staticTabs;
  } 
  public get dynamicTabs(): Array<DynamicTab<T>> {
     return this._dynamicTabs;
  }

  constructor(staticTabs: Array<Omit<StaticTab, 'tabNumber'>>) {
    this._staticTabs = staticTabs.map((tab, i) => {
      return { ...tab, tabNumber: i + STATIC_TABS_NUMBER };
    });
  }
  public selectedTab = STATIC_TABS_NUMBER;

  public addTabDynamically(dynamicTab: Omit<DynamicTab<T>, 'tabNumber'>): void {
    this._dynamicTabs = [
      ...this._dynamicTabs,
      { ...dynamicTab, tabNumber: this._dynamicTabs.length + STATIC_TABS_NUMBER },
    ];
    this.selectedTab = this._dynamicTabs.length;
  }

  public deleteTab(tabNumber: number): void {
    if (this.isDeletable(tabNumber))
     {
      this._dynamicTabs.filter(
        (tab, index) => index === this.indexOfDeletingTab(tabNumber)
      );

      const tabsUpperDeleteTab = this._dynamicTabs.slice(
        this.indexOfDeletingTab(tabNumber)
      );
      const tabsUpperDeleteTabNumberTabUpdated = tabsUpperDeleteTab.map(
        (tab) => {
          return { ...tab, index: tab.tabNumber - 1 };
        }
      );
      this._dynamicTabs = [
        ...this._dynamicTabs.slice(0, this.tabNumberOnDynamicTabs(tabNumber)),
        ...tabsUpperDeleteTabNumberTabUpdated,
      ];
      this.selectedTab =
      this.isNotLastTabOnDynamicTabs(tabNumber)
          ? tabNumber
          : tabNumber - 1;
    }
  }

  private tabNumberOnDynamicTabs(tabNumber: number): number{
      return tabNumber - this._staticTabs.length;
  }

  private isDeletable(tabNumber: number): boolean{
     return this.tabNumberOnDynamicTabs(tabNumber) > 0;
  }

  private indexOfDeletingTab(tabNumber: number): number {
      return tabNumber - this._staticTabs.length - 1;
  }

  private isNotLastTabOnDynamicTabs(tabNumber: number): boolean {
       return this.tabNumberOnDynamicTabs(tabNumber) < this._dynamicTabs.length;
  }
 
}

