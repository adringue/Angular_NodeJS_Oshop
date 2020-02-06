import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Input,
  Output,
  HostListener,
  EventEmitter
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { AuthService } from '../../../../user-auth/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-start-button',
  templateUrl: './game-start-button.component.html',
  styleUrls: ['./game-start-button.component.css']
})
export class GameStartButtonComponent implements OnInit, OnDestroy {
  startButtonNotClickable = false;
  userIsAuthenticated = false;
  pauseButtonSubscription: Subscription;
  cardSubscription: Subscription;
  pressStartButtonSubscription: Subscription;
  endWindowSubscription: Subscription;
  authenticationSubscription: Subscription;
  @Output() buttonStartHasBeenClicked: EventEmitter<any>;
  constructor(private gameService: GameService, private authService: AuthService) {
  }
  ngOnInit() {
    const me = this;
    this.buttonStartHasBeenClicked = new EventEmitter<any>();
   this.pauseButtonSubscription = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        me.startButtonNotClickable = true;
      }
    });
    this.endWindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: any) => {
    });
    this.pressStartButtonSubscription = this.gameService.pressStartButtonToActivateTheGame.subscribe((value: any) => {
      if (value === true) {
        me.startButtonNotClickable = false;
      }
    });
    this.cardSubscription = this.gameService.card.subscribe((value: any) => {
      if (value === true) {
      }
    });
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(isAuthenticated => {
      me.userIsAuthenticated = isAuthenticated;
    });
  }
  startHandler() {
    if (!this.startButtonNotClickable) {
      this.startButtonNotClickable = true;
      this.buttonStartHasBeenClicked.emit();
      this.gameService.changeTimerLauncherSignal(true);
      this.gameService.changePressStartButtonToActivateTheGame(true);
    }
  }
  ngOnDestroy() {
    this.pressStartButtonSubscription.unsubscribe();
    this.pauseButtonSubscription.unsubscribe();
    this.cardSubscription.unsubscribe();
    this.endWindowSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
  }
}
