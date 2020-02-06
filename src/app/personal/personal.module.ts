import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyResumeComponent } from './components/my-resume/my-resume.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [MyResumeComponent
  ],
  exports: [MyResumeComponent]
})
export class PersonalModule { }
