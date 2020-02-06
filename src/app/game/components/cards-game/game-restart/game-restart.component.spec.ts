import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRestartComponent } from './game-restart.component';

describe('GameRestartComponent', () => {
  let component: GameRestartComponent;
  let fixture: ComponentFixture<GameRestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
