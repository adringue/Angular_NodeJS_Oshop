import { ElementRef, Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { VisitorPerformances } from '../models/visitor-game-performances.model';
import { AuthService } from '../../user-auth/services/auth.service';
import { environment } from '../../../environments/environment';
const BACKEND_URL = environment.api_URL + '/performances';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  // result:any;
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
  private _board: BehaviorSubject<any>;
  private _hideGameConsole: BehaviorSubject<boolean>;
  private _timerLauncherSignal: BehaviorSubject<boolean>;
  private _movesCounter: BehaviorSubject<any>;
  private _alertSignal: BehaviorSubject<boolean>;
  private _stars: BehaviorSubject<any>;
  private _continueButton: BehaviorSubject<boolean>;
  private _pause: BehaviorSubject<any>;
  private _card: BehaviorSubject<any>;
  private _resetTimerLauncherSignal: BehaviorSubject<boolean>;
  private _resetCardsMatch: BehaviorSubject<any>;
  private _pressStartButtonToActivateTheGame: BehaviorSubject<any>;
  private _resetStarsColor: BehaviorSubject<any>;
  private _getMyTime: BehaviorSubject<any>;
  private _checkNumberOfMatchMoves: BehaviorSubject<any>;
  private _EndWindowIsVisible: BehaviorSubject<any>;
  private _sendSignalToGameBoardMaxMatchNumber: BehaviorSubject<boolean>;
  private performanceDataArray = [];
  private userloginData = {};
  private _accessAllPerformances: BehaviorSubject<any>;
  private _accessAllPerformancesTransformed: BehaviorSubject<any>;
  private _statsData2AfterReloadingThePage: BehaviorSubject<any>;
  private _accessUserPerformance: BehaviorSubject<any>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this._accessUserPerformance = new BehaviorSubject(null);
    this._hideGameConsole = new BehaviorSubject(false);
    this._sendSignalToGameBoardMaxMatchNumber = new BehaviorSubject(false);
    this._board = new BehaviorSubject<any>(null);
    this._timerLauncherSignal = new BehaviorSubject<boolean>(false);
    this._movesCounter = new BehaviorSubject<any>(null);
    this._alertSignal = new BehaviorSubject<boolean>(false);
    this._stars = new BehaviorSubject<any>(null);
    this._continueButton = new BehaviorSubject<boolean>(false);
    this._pause = new BehaviorSubject<any>(null);
    this._card = new BehaviorSubject<any>(null);
    this._resetTimerLauncherSignal = new BehaviorSubject<boolean>(false);
    this._resetCardsMatch = new BehaviorSubject<any>(null);
    this._pressStartButtonToActivateTheGame = new BehaviorSubject<any>(null);
    this._resetStarsColor = new BehaviorSubject<any>(null);
    this._getMyTime = new BehaviorSubject<any>(null);
    this._checkNumberOfMatchMoves = new BehaviorSubject<any>(null);
    this._EndWindowIsVisible = new BehaviorSubject<any>(false);
    this._accessAllPerformances = new BehaviorSubject<any>(null);
    this._accessAllPerformancesTransformed = new BehaviorSubject<any>(null);
    this._statsData2AfterReloadingThePage = new BehaviorSubject<any>(null);
  }
  get accessUserPerformance() {
    return this._accessUserPerformance;
  }
  changeAccessUserPerformance(newVal: any) {
    this._accessUserPerformance.next(newVal);
    return this._accessUserPerformance;
  }
  get statsData2AfterReloadingThePage() {
    return this._statsData2AfterReloadingThePage;
  }
  changeStatsData2AfterReloadingThePage(newVal: any) {
    this._statsData2AfterReloadingThePage.next(newVal);
    return this._statsData2AfterReloadingThePage;
  }
  get accessAllPerformances() {
    return this._accessAllPerformances;
  }
  changeAccessAllPerformances(newVal: any) {
    this._accessAllPerformances.next(newVal);
    return this._accessAllPerformances;
  }
  get accessAllPerformancesTransformed() {
    return this._accessAllPerformancesTransformed;
  }
  changeAccessAllPerformancesTransformed(newVal: any) {
    this._accessAllPerformancesTransformed.next(newVal);
    return this._accessAllPerformancesTransformed;
  }
  //////////////// board reloading////////////////
  get board() {
    return this._board;
  }
  changeBoard(newVal: any) {
    this._board.next(newVal);
    return this._board;
  }
  ///// game console
  get hideGameConsole() {
    return this._hideGameConsole;
  }
  changeHideGameConsole(newVal: any) {
    this._hideGameConsole.next(newVal);
    return this._hideGameConsole;
  }
  // end game console
  ////////// timeractivation/////////////
  get timerLauncherSignal() {
    return this._timerLauncherSignal;
  }
  changeTimerLauncherSignal(newVal: boolean) {
    this._timerLauncherSignal.next(newVal);
  }
  //  1)
  get movesCounter() {
    return this._movesCounter;
  }
  changeMovesCounter(newVal: any) {
    this._movesCounter.next(newVal);
  }
  // 2)
  get alertPause() {
    return this._alertSignal;
  }
  changeAlertPause(newVal: any) {
    this._alertSignal.next(newVal);
    return this._alertSignal;
  }
  // 3)
  get stars() {
    return this._stars;
  }
  changeStars(newVal: any) {
    this._stars.next(newVal);
    return this._stars;
  }
  // 4)
  get continueButton() {
    return this._continueButton;
  }
  changeContinueButton(newVal: any) {
    this._continueButton.next(newVal);
    return this._continueButton;
  }
  // 5)
  get pause() {
    return this._pause;
  }
  changePause(newVal: any) {
    this._pause.next(newVal);
    return this._pause;
  }
  // 6)
  get card() {
    return this._card;
  }
  changeCard(newVal: any) {
    this._card.next(newVal);
    return this._card;
  }
  // 7)
  get resetTimerLauncherSignal() {
    return this._resetTimerLauncherSignal;
  }
  changeResetTimerLauncherSignal(newVal: boolean) {
    this._resetTimerLauncherSignal.next(newVal);
  }
  // 8)
  get resetCardsMatch() {
    return this._resetCardsMatch;
  }
  changeResetCardsMatch(newVal: any) {
    this._resetCardsMatch.next(newVal);
  }
  // 9)
  get pressStartButtonToActivateTheGame() {
    return this._pressStartButtonToActivateTheGame;
  }
  changePressStartButtonToActivateTheGame(newVal: any) {
    this._pressStartButtonToActivateTheGame.next(newVal);
  }
  // 10
  get resetStarsColor() {
    return this._resetStarsColor;
  }
  changeResetStarsColor(newVal: any) {
    this._resetStarsColor.next(newVal);
  }
  // 11
  get getMyTime() {
    return this._getMyTime;
  }
  changeGetMyTime(newVal: any) {
    this._getMyTime.next(newVal);
  }
  // 12
  get checkNumberOfMatchMoves() {
    return this._checkNumberOfMatchMoves;
  }
  changeCheckNumberOfMatchMoves(newVal: any) {
    this._checkNumberOfMatchMoves.next(newVal);
  }
  // 13
  get endWindowIsVisible() {
    return this._EndWindowIsVisible;
  }
  changeEndWindowIsVisible(newVal: any) {
    this._EndWindowIsVisible.next(newVal);
  }
  // 14
  get sendSignalToGameBoardMaxMatchNumber() {
    return this._sendSignalToGameBoardMaxMatchNumber;
  }
  changeSendSignalToGameBoardMaxMatchNumber(newVal: any) {
    this._sendSignalToGameBoardMaxMatchNumber.next(newVal);
    return this._sendSignalToGameBoardMaxMatchNumber;
  }
  /////////////////////////////////////
  shuffleMyPictureCollection(value: string[]) {
    let currentIndex = value.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = value[currentIndex];
      value[currentIndex] = value[randomIndex];
      value[randomIndex] = temporaryValue;
    }
    return value;
  }
  allPerformances() {
    this.http.get<{ message: string, performances: VisitorPerformances[] }>(BACKEND_URL)
      .subscribe(data => {
        this.changeAccessAllPerformances(data.performances);
      });
  }
  // get User performances
  getUserPerformance(id: string) {
    this.http.get<{ performances: VisitorPerformances }>(BACKEND_URL + '/performance/' + id)
      .subscribe(data => {
        this.changeAccessUserPerformance(data);
      });
  }
  // performance requests
  addPerformance(timeElapsed: number, numberOfMoves: number, rating: string, email: string) {
    const me = this;
    const performanceData = {
      timeElapsed: timeElapsed,
      numberOfMoves: numberOfMoves,
      rating: rating,
      email: email
    };
    this.http.post<{ message: string, result: VisitorPerformances }>(
      BACKEND_URL + '/performance',
      performanceData
    )
      .subscribe(responseData => {
        this.performanceDataArray.push(responseData.result);
      });
  }
}
