import { ShoppingCartService } from '../../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ViewChild,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AuthService } from '../../../../user-auth/services/auth.service';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  endWindowSubscription: Subscription;
  notGameEndWindow = true;
  private numberOfMovesEqual8 = [];
  private numberOfMovesGT8andLT20 = [];
  private numberOfMovesGT20 = [];
  private numberOfMovesLT8 = [];
  private performancesData = [];
  statsData = [];
  private statsData2 = [];
  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, private gameService: GameService) { }
  ngOnInit() {
    const me = this;
    this.shoppingCartService.changeNavBarVisible(false);
    this.shoppingCartService.changeNotInhome(true);
   this.endWindowSubscription = this.gameService.endWindowIsVisible.subscribe(value => {
      if (value === true) { me.notGameEndWindow = false; } else if (value === false) {
        me.notGameEndWindow = true;
      }
    });
  }
  ngOnDestroy() {
    this.endWindowSubscription.unsubscribe();
  }
}
