import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Input,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { trigger, state } from '@angular/animations';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
  styleUrls: ['./game-timer.component.css']
})
export class GameTimerComponent implements OnInit, OnDestroy {
  launchMyTimer = new EventEmitter<any>();
  counterContinue = 0;
  intervalId: any;
  counter = 0;
  timerLauncherSubscription: Subscription;
  resetTimerLauncherSubscription: Subscription;
  endWindowSubscription: Subscription;
  pauseButtonSubscription: Subscription;
  continueButtonSubscription: Subscription;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    this.timerLauncherSubscription = this.gameService.timerLauncherSignal.subscribe((value: boolean) => {
      if (value === true) {
        this.start();
      }
    });
    this.resetTimerLauncherSubscription = this.gameService.resetTimerLauncherSignal.subscribe((value: boolean) => {
      if (value === true) {
        this.stop();
      } else {
        this.hardStop();
      }
    });
    this.endWindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: boolean) => {
      if (value) {
        this.stopCounterNotReset();
      } else {
        this.hardStop();
      }
    });
    this.pauseButtonSubscription = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        this.stopCounterNotReset();
      }
    });
    this.continueButtonSubscription = this.gameService.continueButton.subscribe((value: any) => {
      if (value === true) {
        this.startContinue();
      }
    });
  }
  start() {
    this.intervalId = setInterval(() => {
      this.increaseCounter();
    }, 1000);
  }
  increaseCounter() {
    this.counter++;
    this.gameService.changeGetMyTime(this.counter);
  }
  gameEndChecker() { }
  outputCounterPosition() {
  }
  hardStop() {
    clearInterval(this.intervalId);
    this.counter = 0;
  }
  stop() {
    clearInterval(this.intervalId);
    this.counter = 0;
    this.start();
  }
  stopCounterNotReset() {
    clearInterval(this.intervalId);
    this.counterContinue = this.counter;
  }
  increaseCounterContinue() {
  }
  startContinue() {
    this.intervalId = setInterval(() => {
      this.counter++;
    }, 1000);
  }
  ngOnDestroy() {
    this.continueButtonSubscription.unsubscribe();
    this.endWindowSubscription.unsubscribe();
    this.pauseButtonSubscription.unsubscribe();
    this.resetTimerLauncherSubscription.unsubscribe();
    this.timerLauncherSubscription.unsubscribe();
  }
}
