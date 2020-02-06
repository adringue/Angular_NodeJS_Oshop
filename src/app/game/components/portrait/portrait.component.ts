import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../user-auth/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.css']
})
export class PortraitComponent implements OnInit, OnDestroy {
  imagePreview: string;
  title = 'my-Profile-pic';
  description = 'my-name';
  loginDataSubscription: Subscription;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    this.loginDataSubscription = this.authService.loginData.subscribe(data => {
      if (data) {
        this.imagePreview = data.profileImage;
        this.description = data.email;
      } else {
        this.imagePreview = '';
      }
    });
    // when reloading the page
    this.imagePreview = payload['imagePreview'];
    this.description = payload['email'];
  }
  ngOnDestroy() {
    this.loginDataSubscription.unsubscribe();
  }
}
