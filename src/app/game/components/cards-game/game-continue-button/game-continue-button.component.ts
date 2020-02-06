import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input, ViewChild, HostListener } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-continue-button',
  templateUrl: './game-continue-button.component.html',
  styleUrls: ['./game-continue-button.component.css']
})
export class GameContinueButtonComponent implements OnInit, OnDestroy {
  pauseButtonActivated: boolean;
  pauseSubsciption: Subscription;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
   this.pauseSubsciption = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        this.pauseButtonActivated = true;
      }
    });
    this.pauseButtonActivated = false;
  }
  continueButtonHandler() {
    this.gameService.changeContinueButton(true);
    this.pauseButtonActivated = false;
  }
  ngOnDestroy() {
    this.pauseSubsciption.unsubscribe();
  }
}
