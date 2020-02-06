import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-performances-list',
  templateUrl: './performances-list.component.html',
  styleUrls: ['./performances-list.component.css']
})
export class PerformancesListComponent implements OnInit, OnDestroy {
  allUsersPerformances = [];
  accessAllPerfsSubscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService, private gameService: GameService, private authService: AuthService) { }
  ngOnInit() {
    const me = this;
    this.shoppingCartService.changeNotInhome(true);
   this.accessAllPerfsSubscription = this.gameService.accessAllPerformances.subscribe(data => {
      if (data) {
        me.allUsersPerformances = data.sort((a, b) => a.numberOfMoves - b.numberOfMoves);
      }
    });
  }
  ngOnDestroy() {
    this.accessAllPerfsSubscription.unsubscribe();
  }
}
