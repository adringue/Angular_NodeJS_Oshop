import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSternComponent } from './game-stern.component';

describe('GameSternComponent', () => {
  let component: GameSternComponent;
  let fixture: ComponentFixture<GameSternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
