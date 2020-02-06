import { UserAuthModule } from './user-auth/user-auth.module';
import { BusinessModule } from './business/business.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { GameModule } from 'game/game.module';
import { CustomFormsModule } from 'ng2-validation';
import { PageAccessErrorComponent } from 'shared/components/page-access-error/page-access-error.component';
import { UserModule } from 'user/user.module';

import { AppRoutingModule } from './app-routing-mod/app-routing.module';
import { AppComponent } from './app.component';
import { BusinessAdminModule } from './business-admin/business-admin.module';
import { GameService } from './game/services/game.service';
import { HomePageModule } from './home-page/home-page.module';
import { PersonalModule } from './personal/personal.module';
import { SharedBusinessModule } from './shared-business/shared-business.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user-auth/components/login/login.component';
import { SignupComponent } from './user-auth/components/signup/signup.component';
import { AuthInterceptor } from './user-auth/posts-requests-interceptor/auth-interceptor';
import { AuthService } from './user-auth/services/auth.service';

// import { GameHasFinishedBlockService } from './cards-game/game-has-finished-block.service';
// import { ManageMyNumberOfMovesService } from './cards-game/manage-my-number-of-moves.service';


// tslint:disable-next-line:max-line-length
@NgModule({
  declarations: [
    AppComponent,
    PageAccessErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    SharedBusinessModule,
    BusinessAdminModule,
    DataTableModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    UserAuthModule,
    PersonalModule,
    GameModule,
    HomePageModule,
    UserModule,
    BusinessModule,
    BrowserAnimationsModule,
    UserAuthModule,
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
   GameService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
