import { Component, OnDestroy } from '@angular/core';
import {
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener
} from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Observable } from 'rxjs';
import 'rxjs';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  resetSubscription: Subscription;
  movesButtonSubscription: Subscription;
  MaxMatchNumberSubscription: Subscription;
  boardSubscription: Subscription;
  myClickedCards: any[] = [];
  matchCards: any[] = [];
  notMatchCards: any[] = [];
  arrayOfPictures: string[] = [];
  compareTwoCardsArray: any[] = [];
  mySubscription: Subscription;
  mySubscription2: Subscription;
  matchMoves = 0;
  notMatchMoves = 0;
  totalMoves = 0;
  picturesCollection: string[] = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'anchor',
    'leaf',
    'bicycle',
    'diamond',
    'bomb',
    'leaf',
    'bomb',
    'bolt',
    'bicycle',
    'paper-plane-o',
    'cube'
  ];
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    const me = this;
    this.resetSubscription = this.gameService.resetCardsMatch.subscribe((value: any) => {
      if (value === true) {
        me.resetMatchCards();
      }
    });
    this.movesButtonSubscription = this.gameService.movesCounter.subscribe((value: number) => {
      if (value === 0) {
        me.matchMoves = 0;
        me.notMatchMoves = 0;
        me.totalMoves = 0;
      }
    });
   this.MaxMatchNumberSubscription = this.gameService.sendSignalToGameBoardMaxMatchNumber.subscribe(value => {
      if (value === true) {
        setTimeout(function () {
          me.gameService.changeResetCardsMatch(true);
        }, 1);
      }
    });
    this.arrayOfPictures = this.gameService.shuffleMyPictureCollection(
      this.picturesCollection
    );
    this.boardSubscription = this.gameService.board.subscribe((pictures: any) => {
      if (pictures) {
        me.arrayOfPictures = me.gameService.shuffleMyPictureCollection(
          pictures
        );
      }
    });
  }
  collectClickedCard(data) {
    this.myClickedCards.push(data);
    this.compareTwoCardsArray.push(data);
    this.compareTwoCards(this.compareTwoCardsArray);
  }
  setMyArray(value: string) {
    this.arrayOfPictures.push(value);
  }
  compareTwoCards(value: any[]) {
    if (value.length === 2) {
      if (value[0].cardPicture === value[1].cardPicture) {
        this.matchMoves++;
        value[0].clickInfo = 'clicked';
        value[1].clickInfo = 'clicked';
        value[0].noAction = true;
        value[1].noAction = true;
        this.matchCards.push(value[0]);
        this.matchCards.push(value[1]);
        this.gameService.changeStars(this.matchMoves);
        this.gameService.changeCheckNumberOfMatchMoves(this.matchMoves);
      } else {
        this.notMatchMoves++;
        value[0].animatedCardAfterNotMatch();
        value[1].animatedCardAfterNotMatch();
        this.notMatchCards.push(value[0]);
        this.notMatchCards.push(value[1]);
      }
      this.totalMoves = this.matchMoves + this.notMatchMoves;
      this.gameService.changeMovesCounter(this.totalMoves);
      this.compareTwoCardsArray = [];
    }
  }
  resetMatchCards() {
    const me = this;
    for (const entry of me.myClickedCards) {
      entry['clickInfo'] = 'default';
      entry.clickInfo2 = 'default';
      entry.noAction = false;
      entry.noAction = false;
      if (me.compareTwoCardsArray.length === 1) {
        me.compareTwoCardsArray = [];
      }
    }
    this.gameService.changeCheckNumberOfMatchMoves(0);
  }
  ngOnDestroy() {
  this.resetSubscription.unsubscribe();
  this.movesButtonSubscription.unsubscribe();
  this.MaxMatchNumberSubscription.unsubscribe();
  this.boardSubscription.unsubscribe();
  }
}
