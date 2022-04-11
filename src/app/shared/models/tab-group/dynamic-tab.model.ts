import { StaticTab } from './tab.model';
export interface DynamicTab<T> extends StaticTab {
  contentInfos: T;
}
