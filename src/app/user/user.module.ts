import { PostsService } from './services/posts.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SignUpSuccessfullyComponent } from './components/sign-up-successfully/sign-up-successfully.component';
import {
  MatBadgeModule, MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app-routing-mod/app-routing.module';

@NgModule({
  imports: [CommonModule,
    AppRoutingModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule],
  declarations: [
    PostCreateComponent,
    PostListComponent,
    SignUpSuccessfullyComponent
  ],
  exports: [
    PostCreateComponent,
    PostListComponent,
    SignUpSuccessfullyComponent,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  providers: [PostsService]
})
export class UserModule { }
