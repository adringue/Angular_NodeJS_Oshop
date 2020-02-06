import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Input,
  ViewChild,
  HostListener,
  ElementRef
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-pause',
  templateUrl: './game-pause.component.html',
  styleUrls: ['./game-pause.component.css']
})
export class GamePauseComponent implements OnInit, OnDestroy {
  pauseButtonEnabled: boolean;
  pressStartButtonSubscription: Subscription;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    this.pressStartButtonSubscription = this.gameService.pressStartButtonToActivateTheGame.subscribe((value: any) => {
      if (value === true) {
        this.pauseButtonEnabled = true;
      }
    });
    this.pauseButtonEnabled = false;
  }
  pauseHandler() {
    if (this.pauseButtonEnabled) {
      this.gameService.changePause(true);
    }
  }
  ngOnDestroy() {
    this.pressStartButtonSubscription.unsubscribe();
  }
}
