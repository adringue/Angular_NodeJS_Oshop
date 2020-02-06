import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'shared/help-functions/mime-type.validator';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  // title = 'profile_pic';
  constructor(private shoppingCartService: ShoppingCartService, public authService: AuthService) { }
  ngOnInit() {
    this.shoppingCartService.changeNavBarVisible(true);
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onSignup() {
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(this.form.value.email, this.form.value.password);
    this.form.reset();
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
