import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../user-auth/services/auth.service';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-my-best-performance',
  templateUrl: './my-best-performance.component.html',
  styleUrls: ['./my-best-performance.component.css']
})
export class MyBestPerformanceComponent implements OnInit, OnDestroy {
  numberOfmove: number;
  myPerformances = [];
  numberOfmoves = [];
  accessAllPerfsSubscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, private gameService: GameService) {
  }
  ngOnInit() {
    const me = this;
    const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    this.accessAllPerfsSubscription = this.gameService.accessAllPerformances.subscribe(data2 => {
      if (data2) {
        this.myPerformances = data2.filter(data => data.email === payload['email']);
        // tslint:disable-next-line:forin
        for (const entry in this.myPerformances) {
          this.numberOfmoves.push(this.myPerformances[entry].numberOfMoves);
        }
        this.numberOfmove = Math.min(...this.numberOfmoves);
      }
    });
    this.shoppingCartService.changeNavBarVisible(false);
    this.shoppingCartService.changeNotInhome(true);
  }
  ngOnDestroy() {
    this.accessAllPerfsSubscription.unsubscribe();
  }
}
