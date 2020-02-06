import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameContinueButtonComponent } from './game-continue-button.component';

describe('GameContinueButtonComponent', () => {
  let component: GameContinueButtonComponent;
  let fixture: ComponentFixture<GameContinueButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameContinueButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContinueButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
