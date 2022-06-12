import { DebugElement } from "@angular/core";
import { TableComponent } from "./table.component";
import { TestBed, waitForAsync } from "@angular/core/testing";

export interface QualityControlResult {
  control: string;
  minValue: number;
  maxValue: number;
}
describe("TableComponent", () => {
  let expectedElement: Array<QualityControlResult>;
  let expectedTotalInBackEnd: number;
  let expectedDisplayedColumns: Array<string>;
  let expectedDisplayedColumnsLabels: Array<string>;
  let component: TableComponent<QualityControlResult>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture =
      TestBed.createComponent<TableComponent<QualityControlResult>>(
        TableComponent
      );
    fixture.detectChanges();
    component = fixture.componentInstance;
    expectedElement = [{ control: "temperature", minValue: 20, maxValue: 40 }];
    expectedTotalInBackEnd = 10;
    expectedDisplayedColumns = ["control", "minValue", "maxValue"];
    expectedDisplayedColumnsLabels = ["Control", "Min Value", "Max Value"];


  });

  test("should affect tableRows with merge of displayedColumns and action ", () => {

  });

  test("should have number of lines in same as elements array length ", () => {

  });
});

