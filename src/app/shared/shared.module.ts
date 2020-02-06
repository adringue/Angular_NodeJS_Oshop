import { AppRoutingModule } from 'app-routing-mod/app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import { CustomFormsModule } from 'ng2-validation';
import { HeaderComponent } from './components/header/header.component';
import { OrderService } from './services/order.service';
@NgModule({
  imports: [
    CommonModule, MatToolbarModule, MatInputModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatListModule,
    CustomFormsModule
  ],
  declarations: [HeaderComponent
  ],
  providers: [OrderService],
  exports: [HeaderComponent]
})
export class SharedModule { }
