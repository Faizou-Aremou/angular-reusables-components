import { DebugElement } from "@angular/core";
import { AccordionTableComponent } from "./accordion-table.component";
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
  let component: AccordionTableComponent<QualityControlResult>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture =
      TestBed.createComponent<AccordionTableComponent<QualityControlResult>>(
        AccordionTableComponent
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

