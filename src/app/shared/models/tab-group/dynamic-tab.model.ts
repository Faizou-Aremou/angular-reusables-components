import { Tab } from './tab.model';
export interface DynamicTab<T> extends Tab {
  contentInfos: T;
}
