import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAlertComponent } from './game-alert.component';

describe('GameAlertComponent', () => {
  let component: GameAlertComponent;
  let fixture: ComponentFixture<GameAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
