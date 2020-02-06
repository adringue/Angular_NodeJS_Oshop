import {
  ViewChild,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  HostListener,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
@Component({
  selector: 'app-game-alert',
  templateUrl: './game-alert.component.html',
  styleUrls: ['./game-alert.component.css']
})
export class GameAlertComponent implements OnInit, OnDestroy {
  pauseButtonActivated: boolean;
  pauseSubscription: Subscription;
  continueButtonSubscription: Subscription;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
   this.pauseSubscription = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        this.pauseButtonActivated = true;
      }
    });
   this.continueButtonSubscription = this.gameService.continueButton.subscribe((value: any) => {
      if (value === true) {
        this.pauseButtonActivated = false;
      }
    });
    this.pauseButtonActivated = false;
  }
  ngOnDestroy() {
   this.pauseSubscription.unsubscribe();
   this.continueButtonSubscription.unsubscribe();
  }
}
