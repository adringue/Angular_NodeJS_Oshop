import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBestPerformanceComponent } from './my-best-performance.component';

describe('MyBestPerformanceComponent', () => {
  let component: MyBestPerformanceComponent;
  let fixture: ComponentFixture<MyBestPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBestPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBestPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
