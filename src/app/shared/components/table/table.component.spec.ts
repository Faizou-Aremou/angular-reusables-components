import { DebugElement } from '@angular/core';
import { TableComponent } from './table.component';
import { TestBed, waitForAsync } from '@angular/core/testing';


export interface qualityControlResult {
  control: string;
  minValue: number;
  maxValue: number;
}
describe('TableComponent', () => {
  let expectedElement: Array<qualityControlResult>;
  let expectedTotalInBackEnd: number;
  let expectedDisplayedColumns: Array<string>;
  let expectedDisplayedColumnsLabels: Array<string>;

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
    const component = fixture.componentInstance;
    component.dataSource = expectedElement;
    component.displayedColumns = ['name', 'id', 'description'];
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
 * le nombre de lignes doit être égale au nombre d'élément dans le tableau
 *
 * le nombre de colones doit être égale au nombre de colonnes dans le tableau
 *
 * les bouttons d'actions doivent bien fonctionner
 *
 */
