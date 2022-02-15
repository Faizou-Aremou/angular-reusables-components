export interface TableConfig<T> {
  elements: Array<T>;
  totalInBackEnd: number;
  displayLimit: number;
  displayedColumns: Array<string>;
  displayedColumnsLabels: Array<string>;
}