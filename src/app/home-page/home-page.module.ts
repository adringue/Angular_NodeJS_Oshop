import { AppRoutingModule } from './../app-routing-mod/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeToMyResumeComponent } from './components/welcome-to-my-resume/welcome-to-my-resume.component';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatListModule, AppRoutingModule
  ],
  declarations: [WelcomeToMyResumeComponent],
  exports: [WelcomeToMyResumeComponent]
})
export class HomePageModule { }
