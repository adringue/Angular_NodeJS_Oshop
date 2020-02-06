import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceBarChartComponent } from './performance-bar-chart.component';

describe('PerformanceBarChartComponent', () => {
  let component: PerformanceBarChartComponent;
  let fixture: ComponentFixture<PerformanceBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
