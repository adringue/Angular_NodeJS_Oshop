import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ViewChild,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  HostListener,
  AfterViewChecked
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { AuthService } from '../../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../../shared-business/services/shopping-cart.service';
@Component({
  selector: 'app-game-end-window',
  templateUrl: './game-end-window.component.html',
  styleUrls: ['./game-end-window.component.css']
})
export class GameEndWindowComponent implements OnInit, OnDestroy {
  authenticationSubscription: Subscription;
  endwindowSubscription: Subscription;
  movesSubscription: Subscription;
  timerSubscription: Subscription;
  matchMovesSubscription: Subscription;
  myMoves: number;
  showEndWindow: boolean;
  myTime: number;
  myRating: string;
  userLoginData_current_email: string;
  constructor(private shoppingCartService: ShoppingCartService, private gameService: GameService, private authService: AuthService) {
  }
  ngOnInit() {
    const me = this;
    this.myRating = 'beginner';
    this.myMoves = 0;
    this.showEndWindow = false;
    this.myTime = 0;
    this.gameService.changeMovesCounter(0);
    const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    this.shoppingCartService.changeNotInhome(true);
    this.shoppingCartService.changeNavBarVisible(false);
    me.userLoginData_current_email = payload.email;
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
      }
    });
    this.endwindowSubscription = this.gameService.endWindowIsVisible.subscribe(value => {
      if (value === true) {
        me.showEndWindow = true;
      } else if (value === false) {
        me.showEndWindow = false;
      }
    });
    this.movesSubscription = this.gameService.movesCounter.subscribe((value: any) => {
      me.myMoves = value;
      me.evaluateRating(me.myMoves);
    });
    this.timerSubscription = this.gameService.getMyTime.subscribe((value: number) => {
      me.myTime = value;
    });
    this.matchMovesSubscription = this.gameService.checkNumberOfMatchMoves.subscribe((value: any) => {
      if (value === 8) {
        me.gameService.changeSendSignalToGameBoardMaxMatchNumber(true);
        me.gameService.addPerformance(me.myTime, me.myMoves, me.myRating, me.userLoginData_current_email);
        me.gameService.changeEndWindowIsVisible(true);
      }
    });
  }
  evaluateRating(value: any) {
    if (value === 8) {
      this.myRating = 'Your are expert  keep doing a good job!';
    } else if (value > 8 && value < 20) {
      this.myRating = 'keep improving!';
    } else {
      this.myRating = 'you need more work!';
    }
  }
  startANewGame() {
    this.gameService.changeEndWindowIsVisible(false);
    this.gameService.changePressStartButtonToActivateTheGame(true);
    this.gameService.changeMovesCounter(0);
  }
  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
    this.endwindowSubscription.unsubscribe();
    this.movesSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.matchMovesSubscription.unsubscribe();
  }
}
