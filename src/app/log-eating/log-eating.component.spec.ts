import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEatingComponent } from './log-eating.component';

describe('LogEatingComponent', () => {
  let component: LogEatingComponent;
  let fixture: ComponentFixture<LogEatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogEatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
