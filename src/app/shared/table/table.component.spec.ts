import { DebugElement } from "@angular/core";
import { TableConfig } from "../models/table-config.model";
import { TableComponent } from "./table.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export interface qualityControlResult {
  control: string;
  minValue: number;
  maxValue: number;
}
describe("TableComponent", () => {
  let component: TableComponent<qualityControlResult>;
  let fixture: ComponentFixture<TableComponent<qualityControlResult>>;
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
    fixture =
      TestBed.createComponent<TableComponent<qualityControlResult>>(
        TableComponent
      );
    component = fixture.componentInstance;
    fixture.detectChanges();
    expectedElement = [{ control: "temperature", minValue: 20, maxValue: 40 }];
    expectedTotalInBackEnd = 10;
    expectedDisplayedColumns = ["control", "minValue", "maxValue"];
    expectedDisplayedColumnsLabels = ["Control", "Min Value", "Max Value"];
    //editElementEl = fixture.debugElement.nativeElement.querySelector('#actions-button')

    //         sortData: DebugElement;
    //         changePage: DebugElement;
  });

  it("should affect tableRows with merge of displayedColumns and action ", () => {
    component.displayedColumns = ["name", "id", "description"];
    component.ngOnInit();
    expect(component.tableRows.length).toEqual(
      component.displayedColumns.length + 1
    );
  });

  it("it should have number of lines in same as elements array length ", () => {
    const tableComponentDe: DebugElement = fixture.debugElement;
    const tableLineDe = tableComponentDe.query(By.css('section'));
    const trs: NodeList = tableLineDe.nativeElement;
    console.log(trs.length)
    expect(trs.length).toEqual(expectedElement.length);
  });
});

/**
 * critères de tests
 * 
 * le nombre de lignes doit être égale au nombre d'élément dansle tableau
 * 
 * le nombre de colones doit être égale au nombre de colonnes dans le tableau
 * 
 * les bouttons d'actions doivent bien fonctionner
 * 
 */