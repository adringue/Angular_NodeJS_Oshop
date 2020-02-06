import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToMyResumeComponent } from './welcome-to-my-resume.component';

describe('WelcomeToMyResumeComponent', () => {
  let component: WelcomeToMyResumeComponent;
  let fixture: ComponentFixture<WelcomeToMyResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeToMyResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeToMyResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
