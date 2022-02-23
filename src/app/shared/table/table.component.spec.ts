import { DebugElement } from '@angular/core';
import { TableConfig } from '../models/table-config.model';
import { TableComponent } from './table.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export interface qualityControlResult {
  control: string;
  minValue: number;
  maxValue: number;
}
describe('Mat Table Custom', () => {
  let expectedElement: Array<qualityControlResult>;
  let expectedTotalInBackEnd: number;
  let expectedDisplayedColumns: Array<string>;
  let expectedDisplayedColumnsLabels: Array<string>;
  let tableConfig: TableConfig<string>;
  let editElement: DebugElement;
  let editElementEl: HTMLElement;
  let sortData: DebugElement;
  let changePage: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TableComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    expectedElement = [{ control: 'temperature', minValue: 20, maxValue: 40 }];
    expectedTotalInBackEnd = 10;
    expectedDisplayedColumns = ['control', 'minValue', 'maxValue'];
    expectedDisplayedColumnsLabels = ['Control', 'Min Value', 'Max Value'];
  });

  it('should affect tableRows with merge of displayedColumns and action ', () => {
    const fixture =
      TestBed.createComponent<TableComponent<qualityControlResult>>(
        TableComponent
      );
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.displayedColumns = ['name', 'id', 'description'];
    component.ngOnInit();
    expect(component.tableRows.length).toEqual(
      component.displayedColumns.length + 1
    );
  });

  it('should have number of lines in same as elements array length ', () => {
    const fixture =
      TestBed.createComponent<TableComponent<qualityControlResult>>(
        TableComponent
      );
    fixture.detectChanges();
    const tableElement = fixture.nativeElement.querySelector('.mat-table')!;
    const trs = getElements(tableElement, '.cdk-row,tr');
    console.log(trs.length);
    expect(trs.length).toEqual(expectedElement.length);
  });
});

function getElements(element: Element, query: string): Array<Element> {
  return [].slice.call(element.querySelectorAll(query));
}
/**
 * base criteria
 *
 * le nombre de lignes doit être égale au nombre d'élément dansle tableau
 *
 * le nombre de colones doit être égale au nombre de colonnes dans le tableau
 *
 * les bouttons d'actions doivent bien fonctionner
 *
 */
