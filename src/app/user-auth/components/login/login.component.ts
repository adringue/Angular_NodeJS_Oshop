
import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { mimeType } from '../../posts/post-create/mime-type.validator';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  constructor(public authService: AuthService, private shoppingCartService: ShoppingCartService) { }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
    this.shoppingCartService.changeNavBarVisible(false);
  }
  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password);
  }
}
