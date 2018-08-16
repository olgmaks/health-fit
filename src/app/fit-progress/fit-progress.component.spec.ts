import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitProgressComponent } from './fit-progress.component';

describe('FitProgressComponent', () => {
  let component: FitProgressComponent;
  let fixture: ComponentFixture<FitProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
