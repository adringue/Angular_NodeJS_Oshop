import { ShoppingCartService } from '../../../shared-business/services/shopping-cart.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'shared/help-functions/mime-type.validator';
import { AuthService } from '../../../user-auth/services/auth.service';
@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.css']
})
export class MyResumeComponent implements OnInit, AfterViewInit {
  borderIsVisible = false;
  showBorder = 'none';
  imagePreview = '';
  title = 'resumePicture';
  hideInsertBlock = true;
  form: FormGroup;
  currentImageData = [];
  userIsAuthenticated = false;
  constructor(private authService: AuthService, private shoppingCart: ShoppingCartService) { }
  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.authService.imagePreview.subscribe(data => {
      if (data) {
      }
    });
    ///// when reloading the page
    this.authService.getResumePicture().subscribe(data => {
      if (data.resumePictures[0]) {
        this.imagePreview = data.resumePictures[0].profileImagePath;
      }
    });
    this.authService.authenticationStatusListener.subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.shoppingCart.changeNavBarVisible(false);
    this.shoppingCart.changeNotInhome(true);
  }
  ngAfterViewInit() {
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.authService.changeImagePreview(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
  insertProfilePic() {
    this.authService.saveResumePicture(this.form.value.image, this.title);
    this.hideInsertBlock = false;
  }
  changePicture() {
    this.hideInsertBlock = true;
  }
  showBorders() {
    this.showBorder = 'solid';
    this.borderIsVisible = true;
  }
  hideBorders() {
    this.showBorder = 'none';
    this.borderIsVisible = false;
  }
}
