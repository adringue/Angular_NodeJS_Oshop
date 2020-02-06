import { SharedBusinessModule } from './../shared-business/shared-business.module';
import { AppRoutingModule } from './../app-routing-mod/app-routing.module';
import { DataTableModule } from 'angular5-data-table';
import { AdminAuthGuard } from './services/admin.auth.guard';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, DataTableModule, AppRoutingModule, FormsModule, SharedBusinessModule],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    CategoryFormComponent
  ],
  providers: [AdminAuthGuard]
})
export class BusinessAdminModule { }
