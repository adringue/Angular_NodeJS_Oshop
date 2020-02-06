import { AppRoutingModule } from 'app-routing-mod/app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatProgressSpinnerModule, MatPaginatorModule, MatInputModule,
  MatCardModule, MatButtonModule, MatBadgeModule, MatExpansionModule,
  MatToolbarModule, MatListModule
} from '@angular/material';
import { LoginComponent } from 'user-auth/components/login/login.component';
import { SignupComponent } from 'user-auth/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AuthService } from 'user-auth/services/auth.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatInputModule,
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
  declarations: [LoginComponent,
    SignupComponent],
    providers: [AuthService]
})
export class UserAuthModule { }
