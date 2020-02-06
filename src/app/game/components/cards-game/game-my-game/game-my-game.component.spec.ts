import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMyGameComponent } from './game-my-game.component';

describe('GameMyGameComponent', () => {
  let component: GameMyGameComponent;
  let fixture: ComponentFixture<GameMyGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMyGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
