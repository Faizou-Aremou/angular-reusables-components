import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDragDropComponent } from './text-drag-drop.component';

describe('TextDragDropComponent', () => {
  let component: TextDragDropComponent;
  let fixture: ComponentFixture<TextDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
