import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccessErrorComponent } from './page-access-error.component';

describe('PageAccessErrorComponent', () => {
  let component: PageAccessErrorComponent;
  let fixture: ComponentFixture<PageAccessErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAccessErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccessErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
