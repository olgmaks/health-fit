import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingDayComponent } from './eating-day.component';

describe('EatingDayComponent', () => {
  let component: EatingDayComponent;
  let fixture: ComponentFixture<EatingDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatingDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
