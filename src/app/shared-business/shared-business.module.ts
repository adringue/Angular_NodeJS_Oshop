import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from './components/all-businesses-components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/all-businesses-components/product-quantity/product-quantity.component';
import { BusinessService } from './services/business.service';
import { ClientOrderService } from './services/client-order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
@NgModule({
  imports: [CommonModule],
  declarations: [ProductCardComponent, ProductQuantityComponent],
  exports: [ProductCardComponent, ProductQuantityComponent],
  providers: [BusinessService, ShoppingCartService, ClientOrderService]
})
export class SharedBusinessModule {}
