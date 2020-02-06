import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {
  AfterViewInit,
  Input,
  HostListener,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs';
import { Observer } from 'rxjs';
import { AuthService } from '../../../../user-auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game-restart',
  templateUrl: './game-restart.component.html',
  styleUrls: ['./game-restart.component.css']
})
export class GameRestartComponent implements OnInit, OnDestroy {
  testVl = true;
  newArray: any;
  resetButtonNotClickable = true;
  @Output() fieldArray: EventEmitter<any> = new EventEmitter();
  pauseButtonSubscription: Subscription;
  continueButtonSubscription: Subscription;
  pressStartButtonSubscription: Subscription;
  endWindowSubscription: Subscription;
  authenticationSubscription: Subscription;

  constructor(private gameService: GameService, private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.pauseButtonSubscription = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        this.resetButtonNotClickable = true;
      }
    });
   this.continueButtonSubscription = this.gameService.continueButton.subscribe((value: any) => {
      if (value === true) {
        this.resetButtonNotClickable = false;
      }
    });
   this.pressStartButtonSubscription = this.gameService.pressStartButtonToActivateTheGame.subscribe((value: any) => {
      if (value === true) {
        this.resetButtonNotClickable = false;
      }
    });
   this.endWindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: any) => {
      if (value === true) {
        this.resetButtonNotClickable = true;
      }
    });
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.gameService.changeResetStarsColor(true);
        this.gameService.changeMovesCounter(0);
        this.gameService.changeResetTimerLauncherSignal(false);
        this.gameService.changeResetCardsMatch(true);
        this.router.navigate(['login']);
      }
    });
  }
  sendResetCardsSignal() {
    if (!this.resetButtonNotClickable) {
      this.newArray = this.gameService.shuffleMyPictureCollection(
        this.gameService.picturesCollection
      );
      this.fieldArray.emit(this.newArray);
      this.gameService.changeResetStarsColor(true);
      this.gameService.changeMovesCounter(0);
      this.gameService.changeResetTimerLauncherSignal(true);
      this.gameService.changeResetCardsMatch(true);
      this.gameService.changeBoard(this.gameService.picturesCollection);
    }
  }
  ngOnDestroy() {
this.authenticationSubscription.unsubscribe();
this.continueButtonSubscription.unsubscribe();
this.endWindowSubscription.unsubscribe();
this.pressStartButtonSubscription.unsubscribe();
this.authenticationSubscription.unsubscribe();
  }
}
