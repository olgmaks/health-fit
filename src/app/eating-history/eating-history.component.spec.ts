import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatingHistoryComponent } from './eating-history.component';

describe('EatingHistoryComponent', () => {
  let component: EatingHistoryComponent;
  let fixture: ComponentFixture<EatingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
