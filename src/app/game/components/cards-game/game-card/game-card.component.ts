import { Component, OnDestroy } from '@angular/core';
import {
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent
} from '@angular/animations';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  animations: [
    trigger('clickedState', [
      state(
        'default',
        style({
          display: 'block',
          backgroundColor: 'black',
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '100%',
          fontSize: '0',
          borderRadius: '8px',
          transform: 'scale(1)',
          zIndex: '0'
        })
      ),
      state(
        'clicked',
        style({
          display: 'block',
          backgroundColor: 'black',
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '0%',
          fontSize: '0',
          borderRadius: '8px'
        })
      ),
      transition(
        'default=>clicked',
        animate('0.1ms 0.001ms ease-out')
      )
    ]),
    trigger('clickedState2', [
      state(
        'default2',
        style({
          transform: 'scale(1)',
          zIndex: '0',
          display: 'flex',
          backgroundColor: 'cyan'
        })
      ),
      state(
        'clicked2',
        style({
          display: 'block',
          zIndex: '25',
          transform: 'scale(2)',
          backgroundColor: 'cyan'
        })
      ),
      transition(
        'default2=>clicked2',
        animate('2ms 2s ease-in')
      ),
      transition(
        'clicked2=>default2',
        animate(5)
      )
    ])
  ]
})
export class GameCardComponent implements OnInit, OnDestroy {
  pressStartButtonSubscription: Subscription;
  pauseButtonSubscription: Subscription;
  continueButtonSubscription: Subscription;
  myCards: any[] = [];
  clickInfo = 'default';
  clickInfo2 = 'default';
  startButtonActivated = false;
  noAction = false;
  @Output()
  collectEachCard = new EventEmitter<any>();
  @Input()
  cardPicture: string;
  @ViewChild('frontsideCard')
  frontsideCard;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    const me = this;
    this.myCards.push(this);
   this.pressStartButtonSubscription = this.gameService.pressStartButtonToActivateTheGame.subscribe((value: any) => {
      if (value === true) {
        me.startButtonActivated = true;
      }
    });
    this.pauseButtonSubscription = this.gameService.pause.subscribe((value: any) => {
      if (value === true) {
        me.startButtonActivated = false;
      }
    });
   this.continueButtonSubscription = this.gameService.continueButton.subscribe((value: any) => {
      if (value === true) {
        me.startButtonActivated = true;
      }
    });
  }
  cardClicked() {
    const me = this;
    this.gameService.changeCard(true);
    if (this.startButtonActivated) {
      // tslint:disable-next-line:no-unused-expression
      this.noAction || this.animatedCard();
    }
  }
  animatedCard() {
    this.collectEachCard.emit(this);
    this.clickInfo = 'clicked';
    this.animatedCardFromCloseToScale();
    this.noAction = true;
  }
  animatedCardFromCloseToScale() {
    this.clickInfo2 = 'clicked2';
    setTimeout(() => {
      this.clickInfo2 = 'default2';
    }, 5);
  }
  animatedCardAfterNotMatch() {
    setTimeout(() => {
      this.clickInfo = 'default';
      this.clickInfo2 = 'default';
      this.noAction = false;
    }, 400);
  }
  ngOnDestroy() {
   this. pressStartButtonSubscription.unsubscribe();
   this.pauseButtonSubscription.unsubscribe();
   this.continueButtonSubscription.unsubscribe();
  }
}
