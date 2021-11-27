import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAbstractComponent } from './task-abstract.component';

describe('TaskAbstractComponent', () => {
  let component: TaskAbstractComponent;
  let fixture: ComponentFixture<TaskAbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAbstractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
