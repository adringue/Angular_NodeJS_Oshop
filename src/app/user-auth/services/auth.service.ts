import { ShoppingCartService } from '../../shared-business/services/shopping-cart.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../../user/services/posts.service';
import * as socketIo from 'socket.io-client';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
const BACKEND_URL = environment.api_URL + '/user';
@Injectable({ providedIn: 'root' }) // make the service available in all components and othe
export class AuthService {
  private userId: any;
  private token: string;
  isAuthenticated = false;
  dataWhenToken2 = '';
  private _imagePreview: BehaviorSubject<string>;
  private _authenticationStatusListener: BehaviorSubject<boolean>;
  private hideMainHeader = true;
  private _checkForNewSignupData: BehaviorSubject<any>;
  private _loginData: BehaviorSubject<any>;
  private tokenTimer: any;
  private jwtHelper_business = new JwtHelperService();
  private server_URL = environment.server_URL;
  private socket;
  constructor(
    private http: HttpClient,
    private router: Router,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this._checkForNewSignupData = new BehaviorSubject<any>(null);
    this._imagePreview = new BehaviorSubject<string>(null);
    this._loginData = new BehaviorSubject(null);
    this._authenticationStatusListener = new BehaviorSubject(false);
  }
  get checkForNewSignupData() {
    return this._checkForNewSignupData;
  }
  changeCheckForNewSignupData(newVal: any) {
    this._checkForNewSignupData.next(newVal);
  }
  get imagePreview() {
    return this._imagePreview;
  }
  changeImagePreview(newVal: any) {
    this._imagePreview.next(newVal);
  }
  get authenticationStatusListener() {
    return this._authenticationStatusListener;
  }
  changeAuthenticationStatusListener(newVal: boolean) {
    this._authenticationStatusListener.next(newVal);
  }
  get loginData() {
    return this._loginData;
  }
  changeLoginData(newVal: any) {
    this._loginData.next(newVal);
  }
  createUser(email: string, password: string) {
    const authData = new FormData();
    authData.append('email', email);
    authData.append('password', password);

    this.http
      .post(BACKEND_URL + '/signup', authData)
      .subscribe(response => {
        this.changeCheckForNewSignupData(response);
        console.log(response);
        this.router.navigate(['/login']);
      });
  }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getUser(id: string) {
    return this.http.get<{
      email: string;
      password: string;
      profileImage: string;
      title: string;
      _id: string;
    }>(BACKEND_URL + '/' + id);
  }
  login(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const me = this;
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; userData: any; expiresIn: number }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(response => {
        // here we get the token as response
        // now of course we want to use the token sent by the backend
        // to control access on the backend and denie for any request that wont
        // have a valid token, and still be able to reach these requests by actually add
        // ing the token to requests sent by angular to such protected end point.
        // this.postsService.connectClient();
        //  this.socket = socketIo.connect(this.server_URL);
        //   socket.on('connect', function (e) {
        //    me.socketFromRoutesClient = me.routesClient(socket);
        //   });
        me.userId = response.userData._id;
        me.changeLoginData(response.userData);
        this.socket = socketIo.connect(this.server_URL);
        this.socket.on('connect', function () {
        });
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          // this.tokenTimer = setTimeout(() => {
          //   this.logout();  // when token has expired.
          // }, expiresInDuration * 1000); // setTimeout work with ms thats why x 1000 and need to be clear
          // to get new timer when login again, timer is interpreting number als milisecond
          this.isAuthenticated = true;
          this.changeAuthenticationStatusListener(true); // send signal the user is authenticated
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
        }
        if (returnUrl) {
          this.router.navigate([returnUrl]).then(value => { });
        } else {
          this.router.navigate(['/welcome']).then(value => { });
        }
      });
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout(); // when token has expired.
    }, duration * 1000);
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.changeAuthenticationStatusListener(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.shoppingCartService.clearMyCart();
    this.shoppingCartService.changeNavBarVisible(false);
  }
  private saveAuthData(token, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString()); // serialize the date
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('cartId');
  }
  autoAuthUser() {   // this method need to be ran where the app start---> app.component.ts
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); // in millisecond
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); // in second
      this.changeAuthenticationStatusListener(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
    // reconstruct Date with the serialize date
  }
  saveResumePicture(image: File, title: string) {
    const profilPicData = new FormData();
    profilPicData.append('image', image, title);
    this.http
      .post<{ message: string; resumeData: any }>(environment.api_URL + '/myresume/', profilPicData)
      .subscribe(response => {
        localStorage.setItem('token_resume', response.resumeData.token_resume);
      });
  }
  getResumePicture() {
    return this.http.get<{ message: any, resumePictures: any }>(environment.api_URL + '/myresume/');
  }
  tokenGetterBusiness = () => localStorage.getItem('token');
  decodedTokenGetter = () => this.jwtHelper_business.decodeToken(this.tokenGetterBusiness());
  tokenBusinessHasExpired = () => this.jwtHelper_business.isTokenExpired(this.tokenGetterBusiness());
}
