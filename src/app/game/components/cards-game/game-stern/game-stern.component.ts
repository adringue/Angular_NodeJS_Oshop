import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ViewChild,
  AfterViewInit,
  ElementRef,
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
  selector: 'app-game-stern',
  templateUrl: './game-stern.component.html',
  styleUrls: ['./game-stern.component.css']
})
export class GameSternComponent implements OnInit, OnDestroy {
  @ViewChild('firstStar') firstStar;
  @ViewChild('secondStar') secondStar;
  @ViewChild('thirdStar') thirdStar;
  @ViewChild('allStar') allStar;
  starsSubscription: Subscription;
  resetStarsColorSubscription: Subscription;
  endWindowSubscription: Subscription;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
    this.starsSubscription = this.gameService.stars.subscribe((value: any) => {
      this.adjustStars(value);
    });
    this.resetStarsColorSubscription = this.gameService.resetStarsColor.subscribe((value: any) => {
      if (value === true) {
        this.resetColor();
      }
    });
    this.endWindowSubscription = this.gameService.endWindowIsVisible.subscribe((value: boolean) => {
      if (value === true) {
        this.resetColor();
      }
    });
  }
  adjustStars(value: number) {
    if (this.firstStar && this.secondStar && this.thirdStar) {
      if (value === 8) {
        this.firstStar.nativeElement.style.color = 'white';
        this.secondStar.nativeElement.style.color = 'white';
        this.thirdStar.nativeElement.style.color = 'white';
      } else if (value === 2) {
        this.thirdStar.nativeElement.style.color = 'white';
      } else if (value === 5) {
        this.secondStar.nativeElement.style.color = 'white';
        this.thirdStar.nativeElement.style.color = 'white';
      }
    }
  }
  resetColor() {
    if (this.firstStar && this.secondStar && this.thirdStar) {
      this.firstStar.nativeElement.style.color = 'black';
      this.secondStar.nativeElement.style.color = 'black';
      this.thirdStar.nativeElement.style.color = 'black';
    }
  }
  ngOnDestroy() {
    this.endWindowSubscription.unsubscribe();
    this.resetStarsColorSubscription.unsubscribe();
    this.starsSubscription.unsubscribe();
  }
}
