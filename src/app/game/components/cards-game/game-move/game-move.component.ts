import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input, Output, ViewChild, EventEmitter, AfterViewChecked } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-move',
  templateUrl: './game-move.component.html',
  styleUrls: ['./game-move.component.css']
})
export class GameMoveComponent implements OnInit, OnDestroy {
  numberMoves: number;
  moveCounterSubscription: Subscription;
  endwindowSubscription: Subscription;
  constructor(private gameService: GameService) {
    this.numberMoves = 0;
  }
  ngOnInit() {
    this.moveCounterSubscription = this.gameService.movesCounter.subscribe((value: any) => {
      this.numberMoves = value;
    });
    this.endwindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: boolean) => {
      if (value === false) {
        this.gameService.changeMovesCounter(0);
      }
    });
  }
  ngOnDestroy() {
    this.moveCounterSubscription.unsubscribe();
    this.endwindowSubscription.unsubscribe();
  }
}
