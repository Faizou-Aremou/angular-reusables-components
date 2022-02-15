import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPaneComponent } from './roles-pane.component';

describe('RolesPaneComponent', () => {
  let component: RolesPaneComponent;
  let fixture: ComponentFixture<RolesPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
