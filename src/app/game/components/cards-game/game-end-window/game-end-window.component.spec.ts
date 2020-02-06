import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndWindowComponent } from './game-end-window.component';

describe('GameEndWindowComponent', () => {
  let component: GameEndWindowComponent;
  let fixture: ComponentFixture<GameEndWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEndWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEndWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
