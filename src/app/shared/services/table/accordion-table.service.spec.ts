import { TestBed } from '@angular/core/testing';

import { AccordionTableService } from './accordion-table.service';

describe('AccordionTableService', () => {
  let service: AccordionTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccordionTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
