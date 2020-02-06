import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { BusinessService } from '../../../shared-business/services/business.service';
import { CategoryModel } from '../../../shared-business/interfaces/category-interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnDestroy {
  createACategoSubscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private businessService: BusinessService) { }
  save(category: any) {
    this.createACategoSubscription = this.businessService.createACategory(category.categoryName, category.imageUrl, category.description).
    subscribe((categoryResponse) => {
      this.shoppingCartService.changeRealTimeCategory(true);
      this.router.navigate(['/products']);
    });
  }
  ngOnDestroy() {
    this.createACategoSubscription.unsubscribe();
  }
}
