import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesPaneComponent } from './companies-pane.component';

describe('CompaniesPaneComponent', () => {
  let component: CompaniesPaneComponent;
  let fixture: ComponentFixture<CompaniesPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
