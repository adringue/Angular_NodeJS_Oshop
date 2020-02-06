import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccessErrorComponent } from 'shared/components/page-access-error/page-access-error.component';
import { AdminOrdersComponent } from '../business-admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '../business-admin/components/admin-products/admin-products.component';
import { CategoryFormComponent } from '../business-admin/components/category-form/category-form.component';
import { ProductFormComponent } from '../business-admin/components/product-form/product-form.component';
import { AdminAuthGuard } from '../business-admin/services/admin.auth.guard';
import { CheckOutComponent } from '../business/components/check-out/check-out.component';
import { MyOrdersComponent } from '../business/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from '../business/components/order-success/order-success.component';
import { ProductsComponent } from '../business/components/products/products.component';
import { ShoppingCartComponent } from '../business/components/shopping-cart/shopping-cart.component';
import { GameContainerComponent } from '../game/components/cards-game/game-container/game-container.component';
import { ChatComponent } from '../game/components/chat/chat.component';
import { WelcomeToMyResumeComponent } from '../home-page/components/welcome-to-my-resume/welcome-to-my-resume.component';
import { MyResumeComponent } from '../personal/components/my-resume/my-resume.component';
import { LoginComponent } from '../user-auth/components/login/login.component';
import { SignupComponent } from '../user-auth/components/signup/signup.component';
import { AuthGuard } from '../user-auth/user-auth-guard/auth.guard';
import { PostCreateComponent } from '../user/components/post-create/post-create.component';
import { PostListComponent } from '../user/components/post-list/post-list.component';
import { SignUpSuccessfullyComponent } from '../user/components/sign-up-successfully/sign-up-successfully.component';
const routes: Routes = [
  { path: 'mygame', component: GameContainerComponent, canActivate: [ AuthGuard ] },
  { path: 'myresume', component: MyResumeComponent },
  { path: 'login', component: LoginComponent},
  {path: 'sign-up-success', component: SignUpSuccessfullyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'postlist', component: PostListComponent },
  { path: 'postcreate', component: PostCreateComponent },
  { path: 'welcome', component: ProductsComponent , canActivate: [ AuthGuard ]},
  {path: 'edit/:postId', component: PostCreateComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'check-out', component: CheckOutComponent,  canActivate: [ AuthGuard ]},
  { path: 'access-error', component: PageAccessErrorComponent,  canActivate: [ AuthGuard ]},
  { path: 'order-success/:id', component: OrderSuccessComponent,  canActivate: [ AuthGuard ]},
  { path: 'my-orders', component: MyOrdersComponent,  canActivate: [ AuthGuard ]},
  { path: 'admin-products/:id/:categoryid', component: ProductFormComponent,  canActivate: [ AuthGuard, AdminAuthGuard ]},
  { path: 'admin-products', component: AdminProductsComponent,  canActivate: [ AuthGuard, AdminAuthGuard ]},
  { path: 'admin-new-product', component: ProductFormComponent,  canActivate: [ AuthGuard, AdminAuthGuard ]},
  { path: 'admin-new-category', component: CategoryFormComponent,  canActivate: [ AuthGuard, AdminAuthGuard ]},
  { path: 'admin-orders', component: AdminOrdersComponent,  canActivate: [ AuthGuard, AdminAuthGuard ]},
  { path: '',   redirectTo: '/products', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule {}
// AuthGuard is made avaulable, now just attach it to the route we want to protect
// we use it in the paths above to protect the routes
