import { AuthService } from '../../../user-auth/services/auth.service';
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { CategoryModel } from '../../../shared-business/interfaces/category-interface';
import { ItemModel } from '../../../shared-business/interfaces/item-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusinessService } from '../../../shared-business/services/business.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { from } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../../environments/environment';
const server_URL = environment.server_URL;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: ItemModel[] = [];
  filteredProducts: ItemModel[] = [];
  cart: any;
  subscription: Subscription;
  realtimeProductSubscription: Subscription;
  subscriptionCateg: Subscription;
  subscriptionCategParam: Subscription;
  getAllItemsSubscription: Subscription;
  categoryParam: string;
  getCartSubscription: Subscription;
  realTimeCartSubscription: Subscription;
  subscription3: Subscription;
  authenticationSubscription: Subscription;
  @Input() showActions = true;
  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private route2: Router
  ) {}
  ngOnInit() {
    this.shoppingCartService.changeNavBarVisible(true);
    this.realtimeProductSubscription = this.shoppingCartService.realTimeProduct.subscribe(
      p => {
        if (p === true) {
         this.getAllItemsSubscription = this.businessService.getAllItems().subscribe(allItems => {
            this.allProducts = allItems.data;
            this.subscriptionCategParam = this.route.queryParamMap.subscribe(
              params => {
                this.categoryParam = params.get('category');
                this.filteredProducts = this.categoryParam
                  ? this.allProducts.filter(
                      product => product.category === this.categoryParam
                    )
                  : this.allProducts;
              }
            );
          });
        }
      }
    );
    this.subscription = this.businessService
      .getAllItems()
      .subscribe(allItems => {
        this.allProducts = allItems.data;
        this.subscriptionCategParam = this.route.queryParamMap.subscribe(
          params => {
            this.categoryParam = params.get('category');
            this.filteredProducts = this.categoryParam
              ? this.allProducts.filter(
                  product => product.category === this.categoryParam
                )
              : this.allProducts;
          }
        );
      });
    this.shoppingCartService.changeNotInhome(true);
    this.realTimeCartSubscription = this.shoppingCartService.realTimeCart.subscribe(p => {
      if (p === true) {
        if (this.shoppingCartService.getCart()) {
          this.subscription = this.shoppingCartService
            .getCart()
            .subscribe(mycart => {
              this.cart = mycart.data;
            });
        }
      }
    });
    /////////////////////////////////////////////////
    if (this.shoppingCartService.getCart()) {
      this.subscription3 = this.shoppingCartService
        .getCart()
        .subscribe(mycart => {
          this.cart = mycart.data;
        });
    }
    this.authenticationSubscription = this.authService.authenticationStatusListener.subscribe(value => {
      if (value === false) {
        this.route2.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.realtimeProductSubscription.unsubscribe();
    // this.subscriptionCateg.unsubscribe();
    // this.subscriptionCategParam.unsubscribe();
    // this.subscription3.unsubscribe();
    // this.authenticationSubscription.unsubscribe();
    // this.realTimeCartSubscription.unsubscribe();
    // this.getAllItemsSubscription.unsubscribe();

  }
}
