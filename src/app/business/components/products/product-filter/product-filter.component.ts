import { ShoppingCartService } from '../../../../shared-business/services/shopping-cart.service';
import { BusinessService } from '../../../../shared-business/services/business.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItemModel } from '../../../../shared-business/interfaces/item-interface';
import { CategoryModel } from '../../../../shared-business/interfaces/category-interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input('categoryParam') categoryParam: string;
  allProducts: ItemModel[] = [];
  allCategories: CategoryModel[] = [];
  subscriptionCategParam: Subscription;
  subscriptionCateg: Subscription;
  realTimeCateSubscription: Subscription;
  constructor(private route: ActivatedRoute, private businessService: BusinessService, private shoppingCartService: ShoppingCartService
  ) {
  }
  ngOnInit() {
   this.realTimeCateSubscription = this.shoppingCartService.realTimeCategory.subscribe(p => {
      if (p === true) {
        this.subscriptionCateg = this.businessService
          .getAllCategories()
          .subscribe(allCategories => {
            this.allCategories = allCategories.data;
          });
      }
    });
    this.subscriptionCateg = this.businessService
      .getAllCategories()
      .subscribe(allCategories => {
        this.allCategories = allCategories.data;
      });
  }
  ngOnDestroy() {
   this.realTimeCateSubscription.unsubscribe();
   this.subscriptionCateg.unsubscribe();
  }
}
