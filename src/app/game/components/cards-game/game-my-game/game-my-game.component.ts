import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ViewChild,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  AfterViewChecked,
  OnChanges,
  AfterContentInit
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-my-game',
  templateUrl: './game-my-game.component.html',
  styleUrls: ['./game-my-game.component.css']
})
export class GameMyGameComponent implements OnInit, OnDestroy {
  endwindowSubscription: Subscription;
  myGameContainerIsVisible = false;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    const me = this;
    this.endwindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: boolean) => {
      if (value === true) {
        console.log('mygamecontainer');
        me.myGameContainerIsVisible = true;
      } else if (value === false) {
        me.myGameContainerIsVisible = false;
      }
    });
  }
  launchTimerHelper() { }
ngOnDestroy() {
  this.endwindowSubscription.unsubscribe();
}
}
